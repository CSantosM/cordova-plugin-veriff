// eslint-disable-next-line import/no-unresolved
const exec = require('cordova/exec');

const TOKEN_ERROR = 'Session token is required';

const PLUGIN_NAME = 'VeriffCordovaPlugin';

const LAUNCH_VERIFF_SDK_ACTION = 'launchVeriffSDK';

function start(sessionToken) {
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
				[sessionToken],
			);
		} else {
			reject(new Error(TOKEN_ERROR));
		}
	});
}

module.exports = {
	start,
};
