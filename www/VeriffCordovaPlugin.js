// eslint-disable-next-line import/no-unresolved
const exec = require('cordova/exec');

const PLUGIN_NAME = 'VeriffCordovaPlugin';

function start(sessionToken) {
	return new Promise((resolve, reject) => {
		exec(
			(result) => {
				resolve(result);
			},
			(error) => {
				reject(error);
			},
			PLUGIN_NAME,
			'launchVeriffSDK',
			[sessionToken],
		);
	});
}

module.exports = {
	start,
};
