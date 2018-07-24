const fs         = require('fs');
global.path      = require('path');
global.screenDir = __basedir + path.sep + 'screenshots';

module.exports = {
	
	removeDir: function(path, r = true) {
		if(fs.existsSync(path)) {
			fs.readdirSync(path).forEach(function(file, index) {
				var curPath = path + "/" + file;
				if(fs.lstatSync(curPath).isDirectory()) {
					if (r) {
						module.exports.removeDir(curPath);
					}
				} else {
					fs.unlinkSync(curPath);
				}
			});
			fs.rmdirSync(path);
		}
	},

	createDir: function(path) {
		if(!fs.existsSync(path)) {
			fs.mkdirSync(path);
		}
	},

	parseUrl: function() {
		var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
		return match && {
			href:     href,
			protocol: match[1],
			host:     match[2],
			hostname: match[3],
			port:     match[4],
			pathname: match[5],
			search:   match[6],
			hash:     match[7]
		}
	},

	genFilename: function(link) {
		var name;
		if(link === '') {
			name = 'home';
		} else {
			name = link;
		}
		return screensFolder + path.sep + name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.png';
	},

	init: function() {
		this.removeDir(screenDir);
		this.createDir(screenDir);
	}
}
