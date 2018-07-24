global.__basedir = __dirname;
global.prompt    = require('prompt');
global.fileSys   = require('./lib/file-system/file-system.js');
global.crawler   = require('./lib/crawler/crawler.js');
global.screenGen = require('./lib/screenshot/screenshot.js');

// Remove previously created directories
fileSys.init();

// Prompt configuration
var promptSchema = {
	properties: {
		devSite: {
			description: 'Enter the URL of the development site',
			type: 'string',
			pattern: '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$',
			required: true
		},
		proSite: {
			description: 'Enter the URL of the production site',
			type: 'string',
			pattern: '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$',
			required: true
		}
	}
};

prompt.start();

prompt.get(promptSchema, function(err, result) {
	for(var site in promptSchema.properties) {
		console.log(result[site]);
	}
});
