
# cordova-plugin-veriff

[![npm version](https://img.shields.io/npm/v/cordova-plugin-veriff)](https://www.npmjs.com/package/cordova-plugin-veriff)


Cordova plugin exposing the [Veriff SDK](https://www.veriff.com/) - Smart and scalable identity verification

## Requeriments
- Android 5.1 or newer
- iOS version 11.0 or newer

## Installation

Within your Cordova project:

```bash
$ cordova plugin add cordova-plugin-veriff
```

## Usage

The plugin exposes the VERIFF JavaScript namespace which cointains a Veriff end-to-end verification service.

To use this plugin:

In your ionic app:

1. Declare a global var

```javascript
declare var VERIFF;
```

2. Create a [session verification](https://developers.veriff.com/#/sessions) with your Veriff API KEY.


2. Start the verification process:

We will need the verification sessionUrl to start the Veriff process

```javascript
const sessionURL = session.verification.url;
const configuration = {
  themeColor: '#0F3C32'
};

VERIFF.start(sessionURL, configuration).then((result: { message: string, status: string }) => {
  // The promise returns the VeriffSDK verification result
  console.log("Result: ", result);
}).catch(err => console.error(err));
```

## Building

Within root plugin path:

```bash
$ npm run build
```

## Bugs

- [Bug Tracker](https://github.com/CSantosM/cordova-plugin-veriff/issues)

## Changelog

See [CHANGELOG.md](CHANGELOG.md)

## Author

[Carlos Santos Morales](https://www.linkedin.com/in/csantosm/)

**If you liked the project, consider buy me a coffee :)**
<a href="https://www.buymeacoffee.com/csantosm" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-white.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
