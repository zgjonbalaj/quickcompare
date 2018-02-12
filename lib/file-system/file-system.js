const fs   = require('fs');
const path = require('path');
const dir  = __basedir + path.sep + 'screenshots';

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
		
	}

}
