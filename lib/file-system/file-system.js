const fs         = require('fs');
global.path      = require('path');
global.screenDir = __basedir + path.sep + 'screenshots';

module.exports = {
	
	cleanDir: function(path, r = true) {
		if(fs.existsSync(path)) {
	    fs.readdirSync(path).forEach(function(file, index) {
	      var curPath = path + "/" + file;
	      if(fs.lstatSync(curPath).isDirectory()) {
	      	if (r) {
		        deleteFolderRecursive(curPath);
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

	deleteFiles: function() {

	},

	rootDir: function() {
		
	},
}

// function parseUrl(href) {
//   var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
//   return match && {
//     href: href,
//     protocol: match[1],
//     host: match[2],
//     hostname: match[3],
//     port: match[4],
//     pathname: match[5],
//     search: match[6],
//     hash: match[7]
//   }
// }

// function nameFile(link) {
//   var name;
//   if(link === '') {
//     name = 'home';
//   } else {
//     name = link;
//   }
//   return screensFolder + path.sep + name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.png';
// }
