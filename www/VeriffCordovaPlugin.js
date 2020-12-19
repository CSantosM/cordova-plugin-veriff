// eslint-disable-next-line import/no-unresolved
const exec = require('cordova/exec');

const URL_ERROR = 'Session URL is required';

const PLUGIN_NAME = 'VeriffCordovaPlugin';

const LAUNCH_VERIFF_SDK_ACTION = 'launchVeriffSDK';

function start(sessionToken, configuration) {
	return new Promise((resolve, reject) => {
		if (sessionToken) {
			exec(
				(result) => {
					resolve(result);
				},
				(error) => {
					reject(error);
				},
				PLUGIN_NAME,
				LAUNCH_VERIFF_SDK_ACTION,
				[sessionToken, configuration],
			);
		} else {
			reject(new Error(URL_ERROR));
		}
	});
}

module.exports = {
	start,
};
