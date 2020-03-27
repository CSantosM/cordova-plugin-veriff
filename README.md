
# cordova-plugin-veriff

[![npm version](https://img.shields.io/npm/v/cordova-plugin-veriff)](https://www.npmjs.com/package/cordova-plugin-veriff)


Cordova plugin exposing the [Veriff SDK](https://www.veriff.com/) - Smart and scalable identity verification

## Requeriments
- Android 5.0 or newer
- iOS version 11.0 or newer
## Installation

Within your Cordova project:

```bash
$ cordova plugin add cordova-plugin-veriff
```


## Usage

The plugin exposes the VERIFF JavaScript namespace wich cointains a Veriff end-to-end verification service.

To use this plugin:

In your ionic app:

1. Declare a global var

```javascript
declare var VERIFF;
```

2. Create a session with your Veriff API KEY.


2. Start the verification process:

*sessionToken* should be unique for each call. Check /sessions endpoint in th[e Veriff API documentation](https://developers.veriff.com/#sessions) to learn how to generate one.

```javascript
let sessionToken = "your Veriff session token"
this.platform.ready().then(() => {
  VERIFF.start(sessionToken).then(code => {
    // The promise returns the VeriffSDK verification result
  });
});
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
