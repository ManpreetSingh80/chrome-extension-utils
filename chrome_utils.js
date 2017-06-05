/*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.app = window.app || {};

/**
 * Utility methods
 * @namespace
 */
app.CUtils = (function() {
	'use strict';

	new ExceptionHandler();

	return {
		/** Get the extension's name
		 * @returns {string} Extension name
		 * @memberOf app.CUtils
		 */
		getExtensionName: function() {
			return `chrome-extension://${chrome.runtime.id}`;
		},

		/**
		 * Get the Extension version
		 * @returns {string} Extension version
		 * @memberOf app.CUtils
		 */
		getVersion: function() {
			const manifest = chrome.runtime.getManifest();
			return manifest.version;
		},

		/**
		 * Get the Chrome version
		 * @see http://stackoverflow.com/a/4900484/4468645
		 * @returns {int} Chrome major version
		 * @memberOf app.CUtils
		 */
		getChromeVersion: function() {
			const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
			return raw ? parseInt(raw[2], 10) : false;
		},

		/**
		 * Get the full Chrome version
		 * @see https://goo.gl/2ITMNO
		 * @returns {string} Chrome version
		 * @memberOf app.CUtils
		 */
		getFullChromeVersion: function() {
			const raw = navigator.userAgent;
			return raw ? raw : 'Unknown';
		},

        /**
         * Get the OS as a human readable string
         * @returns {Promise.<string>} OS name
         * @memberOf app.CUtils
         */
        getPlatformOS: function() {
            const chromep = new ChromePromise();
            return chromep.runtime.getPlatformInfo().then((info) => {
                let output = 'Unknown';
                const os = info.os;
                switch (os) {
                    case 'win':
                        output = 'MS Windows';
                        break;
                    case 'mac':
                        output = 'Mac';
                        break;
                    case 'android':
                        output = 'Android';
                        break;
                    case 'cros':
                        output = 'Chrome OS';
                        break;
                    case 'linux':
                        output = 'Linux';
                        break;
                    case 'openbsd':
                        output = 'OpenBSD';
                        break;
                    default:
                        break;
                }
                return Promise.resolve(output);
            });
        },
    };
})();