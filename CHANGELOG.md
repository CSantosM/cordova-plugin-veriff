# Changelog

## Version 2.1.0

* VERIFF.start method allows an optional `configuration` param composed by `themeColor` property which represent the HEX color value of the Veriff theme

```javascript
const configuration = {
  themeColor: '#0F3C32'
};
```


## Version 2.0.0

* VERIFF.start method requires the Veriff **verification URL** instead of the token
* The response of the Veriff process is a JSON object.

```javascript
{
  "status": string // "VeriffSDK.Status" [DONE , CANCELED or ERROR]
  "message": string // Detailed message
}
```

### Android

* Updated Veriff SDK to version **3.6.0**
* Required Android 5.1 or upper

### iOS

* Updated Veriff SDK to version **4.1.0**

## Version 1.1.0

### Android

* Use veriff-library **v2.10.0**

### iOS

* Use veriff-library **v2.8.0**
* Fix SWIFT_VERSION: Added *after_prepare* hook

## Version 1.0.0

* Added Android support
* Added iOS support