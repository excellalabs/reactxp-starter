# Your App

## For Developers

### Dependencies
* [`nodeJS`](https://nodejs.org/en/download/)
* `npm` 5+ -- Ensure this by running `npm i -g npm@latest`
* [See the **Installing dependencies** section for React Native](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies)

### Quickstart
Do not use `yarn`.  Using `npm` 5+, the `package-lock.json` serves as a means of ensuring all developers and CI are using the same versions of all packages.

* `npm install` -- Install the local dependencies
* `npm run android` -- Run the app on an android simulator or attached android device
* `npm run ios` -- Run the app on an iOS simulator


### Linting, typechecking and testing
To run all of the checks, use `npm run check`.
For each individually, run:
* `npm test` -- Run unit tests
* `npm run lint` -- Lint the code with TSLint (using [Standard](https://standardjs.com/) rules)
* `npm run check:tsc` -- Use typescript to check types

#### Fixing checks
* `npm test -- -u` -- Rebuild jest snapshots
* `npm run lint -- --fix` -- Fix tslint errors

### Storybook
To use Storybook:
1. Open an Android Virtual Device (using `npm run avd` or Android Studio) or plug an Android device into your computer
1. Issue the command `npm run storybook`
1. Wait for the browser and app to open
1. Explore the stories

### Code coverage view
To see a full code coverage report, after running tests, run `npm run coverage`

### VSCode debug support
To gain full debug compatibility with VSCode, make sure you have `react-native-cli` installed globally (^2.0.1).  Next, install [React Native Tools](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native).  You should now be able to generate a **Debug Android** debug configuration, which will.

To debug the application:
* Launch an AVD or plug in an Android device
* Run the **Debug Android** debug configuration


## Development help

### Custom absolute imports
Some imports, such as `components`, `actions`, and `thunks` are custom-defined absolute imports. This means you can import the `Display` component, for instance, using the path `components/Display`.  There are three places where these custom absolute imports must be defined:

1. `.babelrc` -- Under the `module-alias` plugin
    * All custom absolute imports must be declared here
    * Without this, React Native will not know how to properly find the files
2. `tsconfig.json` -- Under the `paths` property
    * Only custom imports not immediately under `src` need to be included here.
    * `components`, `containers`, and `helpers`, for instance don't need to be declared here because they are immediate children of `src`
    * Without this, TypeScript will not be able to find the module, and will fail to build
3. `jest.json` -- under the `moduleNameMapper` property
    * This one acts slightly differently, in that it takes a regex as the means by which to map the name.
    * Capture groups can be transposed to the destination using the keys `$1` for the first group, `$2` for the second, etc.
    * Without this, your unit tests will break whenever something is referenced using a custom absolute import

For a complete list of these custom absolute imports, look at the `.babelrc` file.