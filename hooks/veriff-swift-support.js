#!/usr/bin/env node

"use strict";

var fs = require("fs"),
	path = require("path"),
	xcode = require("xcode"),
	xmlEntities = new (require("html-entities").XmlEntities)(),
	SWIFT_VERSION = "4.2",
	SWIFT_VERSION_XCODE = '"' + SWIFT_VERSION + '"';

module.exports = function(context) {

	var projectRoot = context.opts.projectRoot,
		projectName = getProjectName(projectRoot),
		platformPath = path.join(projectRoot, "platforms", "ios"),
		xcodeProjectName = projectName + ".xcodeproj",
		xcodeProjectConfigPath = path.join(
			platformPath,
			xcodeProjectName,
			"project.pbxproj"
		),
        xcodeProject;
        
    xcodeProject = xcode.project(xcodeProjectConfigPath);

    xcodeProject.parse(function (error) {

        var buildSettingsChanged = false;
        var configurations = nonComments(xcodeProject.pbxXCBuildConfigurationSection());

        Object.keys(configurations).forEach(function (config) {

            var buildSettings = configurations[config].buildSettings;
        
            if (!matchBuildSettingsValue(buildSettings.SWIFT_VERSION, SWIFT_VERSION_XCODE)) {
                buildSettings.SWIFT_VERSION = SWIFT_VERSION_XCODE;
                buildSettingsChanged = true;
            }
        });

        if (buildSettingsChanged) {
            fs.writeFileSync(xcodeProjectConfigPath, xcodeProject.writeSync(), 'utf-8');
            debug('file correctly fixed: ' + getRelativeToProjectRootPath(xcodeProjectConfigPath, projectRoot));	
        } else {
            debug('file is correct: ' + getRelativeToProjectRootPath(xcodeProjectConfigPath, projectRoot));	
        }
    });

};

function getProjectName(protoPath) {
	var
		cordovaConfigPath = path.join(protoPath, 'config.xml'),
		content = fs.readFileSync(cordovaConfigPath, 'utf-8');

	var name = /<name>([\s\S]*)<\/name>/mi.exec(content)[1].trim();
	return xmlEntities.decode(name);
}

function matchBuildSettingsValue(value, expectedValue) {
	return value === expectedValue;
}

function debug(msg) {
	console.log('veriff-swift-support.js [INFO] ' + msg);
}

function nonComments(obj) {
    var COMMENT_KEY = /_comment$/;
	var
		keys = Object.keys(obj),
		newObj = {},
		i = 0;

	for (i; i < keys.length; i += 1) {
		if (!COMMENT_KEY.test(keys[i])) {
			newObj[keys[i]] = obj[keys[i]];
		}
	}

	return newObj;
}

function getRelativeToProjectRootPath(path, projectRoot) {
	return path.replace(projectRoot, '.');
}