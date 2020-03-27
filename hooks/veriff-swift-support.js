#!/usr/bin/env node

/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */

const fs = require('fs');
const path = require('path');
const xcode = require('xcode');
const xmlEntities = new (require('html-entities').XmlEntities)();

const SWIFT_VERSION = '4.2';
const SWIFT_VERSION_XCODE = `"${SWIFT_VERSION}"`;

function getProjectName(protoPath) {
	const cordovaConfigPath = path.join(protoPath, 'config.xml');
	const content = fs.readFileSync(cordovaConfigPath, 'utf-8');
	const name = /<name>([\s\S]*)<\/name>/mi.exec(content)[1].trim();
	return xmlEntities.decode(name);
}

function matchBuildSettingsValue(value, expectedValue) {
	return value === expectedValue;
}

function debug(msg) {
	console.log(`veriff-swift-support.js [INFO] ${msg}`);
}

function nonComments(obj) {
	const COMMENT_KEY = /_comment$/;
	const
		keys = Object.keys(obj);
	const newObj = {};
	let i = 0;

	for (i; i < keys.length; i += 1) {
		if (!COMMENT_KEY.test(keys[i])) {
			newObj[keys[i]] = obj[keys[i]];
		}
	}

	return newObj;
}

function getRelativeToProjectRootPath(pathArg, projectRoot) {
	return pathArg.replace(projectRoot, '.');
}

module.exports = (context) => {
	const { projectRoot } = context.opts;
	const projectName = getProjectName(projectRoot);
	const platformPath = path.join(projectRoot, 'platforms', 'ios');
	const xcodeProjectName = `${projectName}.xcodeproj`;
	const xcodeProjectConfigPath = path.join(
		platformPath,
		xcodeProjectName,
		'project.pbxproj',
	);
	const xcodeProject = xcode.project(xcodeProjectConfigPath);

	xcodeProject.parse((error) => {
		let buildSettingsChanged = false;
		const configurations = nonComments(xcodeProject.pbxXCBuildConfigurationSection());

		Object.keys(configurations).forEach((config) => {
			const { buildSettings } = configurations[config];

			if (!matchBuildSettingsValue(buildSettings.SWIFT_VERSION, SWIFT_VERSION_XCODE)) {
				buildSettings.SWIFT_VERSION = SWIFT_VERSION_XCODE;
				buildSettingsChanged = true;
			}
		});

		if (buildSettingsChanged) {
			fs.writeFileSync(xcodeProjectConfigPath, xcodeProject.writeSync(), 'utf-8');
			debug(`file correctly fixed: ${getRelativeToProjectRootPath(xcodeProjectConfigPath, projectRoot)}`);
		} else {
			debug(`file is correct: ${getRelativeToProjectRootPath(xcodeProjectConfigPath, projectRoot)}`);
		}
	});
};
