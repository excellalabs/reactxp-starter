#!/usr/bin/env bash

#############################################
#                                           #
#  General bash and android build concepts  #
#                                           #
#############################################
#
#  ~~ INSTRUCTIONS ~~
#
# 1) Before running this script, if you plan to upload the result to the Google Play store, ensure that you update the version code
#    This must be done in two places:
#      * Line 93 of ./android/app/build.gradle
#      * Line 3  of ./android/src/main/AndroidManifest.xml
#    If you don't do this, then the Google Play store will reject the APK
#
# 2) You will need to have the password for the keystore handy.  This should have been shared with you through USCIS email
#
#
#
#  ~~ ALL ABOUT BASH ~~
#
# 1) The $? variable is the variable that stores the return of the previous command
#    The commands that say things like "ret=$?" just means "set the variable $ret equal to the return value from the previous command"
#    This is useful for things other than just functions.  It will, for instance, get you the exit code of any bash command, script, or executable
#
# 2) The functions defined below act just like any bash command, script or executable
#    You call them the same way, you pass parameters the same way, and you read arguments the same way
#    That is to say, that arguments are in the form of $1, $2, $3, etc.
#
# 3) There's some magic code in this script, mostly confined to the "getMaxAndroidBuildToolsVersionNumber" function
#    If you don't know what you're doing, you probably shouldn't be trying to fix it.
#    The purpose of the function is to get the latest android build-tools number from all of the directories under "$ANDROID_HOME/build-tools"
#    If the build-tools version is less than 24.0.3, it will return with an exit code of 1
#
#
#
#  ~~ ALL ABOUT ANDROID BUILDING ~~
#
# 1) The gradlew command to build the app produces an APK which is unaligned and unsigned
#    An app must be both aligned and signed in order to be pushed to and installed from the play store
#
# 2) The command to align an APK is 'zipalign'; the command to sign the APK is 'apksigner'
#    Both of these commands are only available from Android build-tools 24.0.3 and up -- thus the restriction above
#
# 3) The APK output from the gradlew build is placed in the ./android/app/build/outputs/apk/ directory and called app-release-unsigned.apk
#    This script moves it from there to ./android/artifacts and renames it to app-release-unaligned.apk
#    The script then aligns it using zipalign, and renames the aligned copy to app-release-unsigned.apk -- it also validates the alignment
#    The script then signs it using apksigner, and renames the signed copy to app-release.apk -- it also validates the signature
#    The keystore 'uscis-release.keystore' is the one used to sign the APK
#
# 4) The keystore is safe to be in the repository because it is encrypted using a password.
#    This password must be kept secure, and should only be shared over USCIS email
#
# 5) All versions of this application must be signed using the same keys that are in the keystore, otherwise the app will be rejected
#
# 6) Once an aligned, signed APK is produced using this script, it can be uploaded to Carwash and the Google Play store
#



UNALIGNED_NAME="app-release-unaligned.apk"
UNSIGNED_NAME="app-release-unsigned.apk"
SIGNED_NAME="app-release.apk"
KEYSTORE="yourapp-release.keystore"

OUTPUT_DIR="artifacts"

HAS_FLAG=false
BUILD=false
ZIPALIGN=false
SIGN=false

USAGE="Usage: npm run android:build [-- -bzsh]"

function printHelp() {
  echo "$USAGE"
  echo " --- OPTIONS ---"
  echo "     -b (build):    Build the unsigned apk"
  echo "     -z (zipalign): Zipalign the unsigned apk"
  echo "     -s (sign):     Sign the zipaligned apk"
  echo
  echo "If no flags are provided, all steps of the build are taken."
  echo "If flags are provided, only the steps of the build specified are taken."
  exit 0
}

while getopts bzsh o
do
  HAS_FLAG=true
  case "$o" in
    b)	 BUILD=true;;
    z)	 ZIPALIGN=true;;
    s)	 SIGN=true;;
    h)	 printHelp;;
    [?]) printf >&2 "$USAGE\n\n"; exit 1;;
  esac
done

if [[ $HAS_FLAG == false ]]
then
  # no flags set
  BUILD=true
  ZIPALIGN=true
  SIGN=true
fi

function getMaxAndroidBuildToolsVersionNumber()
{
  LIST=`exec ls $ANDROID_HOME/build-tools | tr '\n' ' '`
  IFS=' ' read -r -a array <<< "$LIST"
  IFS=$'\n' sorted=($(sort -r <<<"${array[*]}"))
  export BUILD_TOOLS_VERSION="${sorted[0]}"
  IFS='.' read -r -a build <<< "$BUILD_TOOLS_VERSION"
  MAJOR="${build[0]}"
  MINOR="${build[1]}"
  REVISION="${build[2]}"
  echo "Highest Android build-tools version: ($BUILD_TOOLS_VERSION)"
  if ([ $MAJOR -lt 24 ] || [ $MAJOR -eq 24 -a $MINOR -eq 0 -a $REVISION -lt 3 ]); then
    echo "You must have Android build-tools version 24.0.3 or greater."
    echo "Please install it and try again."
    return 1
  fi
}

function checkForDiff()
{
  git diff -s --exit-code
  return $?
}

function cleanAll()
{
  if [ -d "./android/$OUTPUT_DIR" ]; then
    rm -rf "./android/$OUTPUT_DIR"
  fi
  npm run android:clean
  npm run clean:rn
  npm run clean:all
}

function buildAndMove()
{
  echo "Building APK..."
  pushd "./android/"
    ./gradlew assembleRelease; ret=$?

    if [ $ret -ne 0 ]; then
      popd
      return $ret
    fi

    if [ ! -d "./$OUTPUT_DIR" ]; then
      mkdir "$OUTPUT_DIR"
    fi

    mv "./app/build/outputs/apk/app-release-unsigned.apk" "./$OUTPUT_DIR/$UNALIGNED_NAME"
  popd
}

function alignAppAndVerify()
{
  echo "Aligning and validating app..."
  pushd "./android/$OUTPUT_DIR/"
    "$ANDROID_HOME/build-tools/$BUILD_TOOLS_VERSION/zipalign" -v 4 "$UNALIGNED_NAME" "$UNSIGNED_NAME"; ret=$?

    if [ $ret -ne 0 ]; then
      popd
      return $ret
    fi

    "$ANDROID_HOME/build-tools/$BUILD_TOOLS_VERSION/zipalign" -c -v 4 "$UNSIGNED_NAME"; ret=$?
  popd

  return $ret
}

function signApp()
{
  KEYSTOREPW="$KEYSTORE_PASSWORD"
  echo "Signing and validating app..."
  pushd "./android/$OUTPUT_DIR/"
    if [ ! -v KEYSTORE_PASSWORD -o -z "$KEYSTORE_PASSWORD" ]
    then
      echo "What is the keystore password?"
      read KEYSTOREPW
    fi

    "$ANDROID_HOME/build-tools/$BUILD_TOOLS_VERSION/apksigner" sign \
          --ks "../../$KEYSTORE" --ks-pass "pass:$KEYSTOREPW" \
          --verbose --out "$SIGNED_NAME" "$UNSIGNED_NAME"; ret=$?
    
    if [ $ret -ne 0 ]; then
      popd
      return $ret
    fi

    "$ANDROID_HOME/build-tools/$BUILD_TOOLS_VERSION/apksigner" verify -v "$SIGNED_NAME"; ret=$?
  popd

  return $ret
}

function retrySignApp()
{
  signApp; ret=$?

  if [ $ret -ne 0 ]; then
    echo "Something went wrong."
    echo "Trying signature again..."
    retrySignApp
  fi
}

function main()
{
  getMaxAndroidBuildToolsVersionNumber; ret=$?

  if [ $ret -ne 0 ]; then
    exit $ret
  fi

  if [[ $BUILD == true ]]
  then
    checkForDiff; ret=$?

    if [ $ret -ne 0 ]; then
      echo "There are still uncommitted changes.  Make sure you commit all changes before running the ios deploy script."
      exit $ret
    fi

    cleanAll
    buildAndMove; ret=$?

    if [ $ret -ne 0 ]; then
      exit $ret
    fi
  fi

  if [[ $ZIPALIGN == true ]]
  then
    alignAppAndVerify; ret=$?

    if [ $ret -ne 0 ]; then
      exit $ret
    fi
  fi

  if [[ $SIGN == true ]]
  then
    retrySignApp
  fi

  echo "APK file generated and signed!"
  echo "Find apk file at './android/$OUTPUT_DIR/$SIGNED_NAME'"
}

main
