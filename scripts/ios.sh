#!/usr/bin/env bash

creator="npmI"
service="altool"

function checkForDiff()
{
  git diff -s --exit-code
  return $?
}

function cleanAll()
{
  npm run clean:rn
  npm run clean:all
}

function generateBuildNumber()
{
  pushd "./ios/"

    echo "Generating new build number..."

    # increment the build number
    agvtool bump -all

    # read major/minor version number
    version="$(agvtool what-marketing-version -terse1)"

    # read new build number
    build="$(agvtool what-version -terse)"

    # create full verion number (major.minor.patch - semver)
    tag="$version.$build"

    echo "New build number: $tag"

  popd

  export tag
}

function npmVersion()
{
  tag="$1"

  echo "Setting npm version number to $tag..."
  npm --no-git-tag-version -f version "$tag"
}

function buildAndExport()
{
  pushd "./ios/"

    echo "Building .app file..."
    xcodebuild -workspace "./myuscisMobileApp.xcodeproj/project.xcworkspace" -scheme myuscisMobileApp -sdk iphoneos -configuration Release archive -archivePath "./build/myApp.xcarchive"
    ret=$?

    if [ $ret -ne 0 ]; then
      popd
      return $ret
    fi

    echo "Exporting .ipa archive..."
    xcodebuild -exportArchive -exportPath "./archive" -archivePath "./build/myApp.xcarchive" -exportOptionsPlist "./exportOptions.plist"

  popd

  return $?
}

function getUsernameAndPassword()
{
  echo -n "iTunes Connect Username: "
  read username

  password="$(security find-generic-password -a "$username" -c $creator -s $service -w)"

  if [[  -z  $password  ]]; then
    echo -n "iTunes Connect Password: "
    read -s password
    security add-generic-password -a "$username" -c $creator -s $service -w "$password"
  fi;

  export username
  export password
}

function getPasswordNoStore()
{
  echo "iTunes Connect Username: $username"
  echo -n "iTunes Connect Password: "
  read -s password

  security add-generic-password -a "$username" -c $creator -s $service -w "$password"

  export password
}

function validateAndUpload()
{
  username="$1"
  password="$2"

  echo "Validating archive..."
  /Applications/Application\ Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Support/altool --validate-app --username "$username" -p "$password" --file "./ios/archive/myuscisMobileApp.ipa"
  ret=$?

  if [ $ret -ne 0 ]; then
    return $ret
  fi

  echo "Uploading archive..."
  /Applications/Application\ Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Support/altool --upload-app --username "$username" -p "$password" --file "./ios/archive/myuscisMobileApp.ipa"

  return $?
}

function commitAndTag()
{
  tag="$1"


  echo "Staging all changes and committing..."
  git branch "$tag"
  git checkout "$tag"
  git commit -am "Incremented version number to $tag"
  git push origin "$tag"

  echo "Tagging commit..."
  git tag "v$tag"
  git push origin "v$tag"

  if ! type "hub" >/dev/null; then
    echo "NOTE: A branch was created called $tag -- don't forget to open a PR to get this merged into master."
    echo "      If you want this script to automatically create a PR for you, install the 'hub' command using 'brew install hub'"
  else
    echo "Opening Pull Request..."
    if [ ! -f ~/.config/hub ]; then
      echo "
NOTE: If you don't want to have to put in your credentials every time, try this:
      Generate a personal access token (https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
      Make sure your token has full 'repo' access
      Edit '~/.config/hub' and add the following:


---
github.com:
- protocol: https
  user: <YOUR_USERNAME>
  oauth_token: <YOUR_PERSONAL_ACCESS_TOKEN>


"
    fi
    hub pull-request -m "Incremented version number to $tag" -h "$tag"
  fi
  echo
}

function main()
{
  checkForDiff; ret=$?

  if [ $ret -ne 0 ]; then
    echo "There are still uncommitted changes.  Make sure you commit all changes before running the ios deploy script."
    exit $ret
  fi

  cleanAll
  generateBuildNumber
  npmVersion "$tag"
  buildAndExport; ret=$?

  if [ $ret -ne 0 ]; then
    exit $ret
  fi

  getUsernameAndPassword
  validateAndUpload "$username" "$password"; ret=$?

  while [ $ret -ne 0 ]; do
    getPasswordNoStore
    validateAndUpload; ret=$?
  done

  commitAndTag "$tag"

}

main
