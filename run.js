const prompt = require('prompt');
const fs = require('fs');
const path = require('path');
const dir = process.cwd() + path.sep + 'screenshots'
const crawler = require('easycrawler');
const colors = require('colors');
const webshot = require('node-webshot');


/**
 *
 * Checking for directories, any exisiting files
 * if not create directory if exists remove all
 * files from any previous run.
 *
 */

var deleteFolderRecursive = function(path) {
  if(fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive(dir);

if(!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

/* Console colors */

colors.setTheme({
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  success: 'green',
  data: 'magenta',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

/* Prompt Vars */

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

/* Webshot configuration */

var webshotOptions = {
  screenSize: {
    width: 1920,
    height: 1080
  }
  // shotSize: {
  //   width: 320,
  //   height: 'all'
  // }
};

function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if(url.indexOf("://") > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}

function nameFile(link, breakpoint) {
  var name;
  if(link === '') {
    name = 'home';
  } else {
    name = link;
  }
  return screensFolder + path.sep + name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.png';
}

function generateScreenshots(baseUrl, linkList, ) {

  var baseSite = extractHostname(baseUrl);
  var screensFolder = dir + path.sep + baseSite;

  if(!fs.existsSync(screensFolder)) {
    fs.mkdirSync(screensFolder);
  }

  linkList.forEach(function(link) {
    webshot(link, nameFile(link), webshotOptions, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('[ PNG SAVED ] => '.success + nameFile(link));
      }
    });
  });

}

function crawlSite(site) {
  var crawl = new crawler({
    thread: 5,
    logs: false,
    depth: 10,
    headers: { 'user-agent': 'LogikBarn Crawler: DevTest' },
    onlyCrawl: [site],
    reject: ['?'],
    onSuccess: function(data) {
      console.log("[ FOUND ] => ".verbose + data.url);
    },
    onError: function(data) {
      console.log("[ ERROR ] => ".error + data.url);
    },
    onFinished: function(urls) {
      console.log("\n" + "== [ END OF SPIDER ] ==".verbose + "\n");

      var crawledUrls = urls.crawled.toString().split(',');
      var discoveredUrls = urls.discovered.toString().split(',');

      discoveredUrls = discoveredUrls.filter(function(item, pos) {
        return discoveredUrls.indexOf(item) == pos;
      })

      for(var i = 0; i < discoveredUrls.length; i++) {
        console.log("[ DISCOVERED ] => ".data + discoveredUrls[i]);
      }
      console.log("\n" + " == [ END OF DISCOVERED ] ==".data + "\n");

      for(var i = 0; i < crawledUrls.length; i++) {
        console.log("[ CRAWLED ] => ".success + crawledUrls[i]);
      }
      console.log("\n" + " == [ END OF CRAWL ] ==".success + "\n");

      generateScreenshots(site, crawledUrls, function() {
        console.log('finished screenshot generation');
      });
    }
  });

  crawl.crawl(site);
}

prompt.start();

prompt.get(promptSchema, function(err, result) {
  for(var site in promptSchema.properties) {
    if(!fs.existsSync(dir + path.sep + site)) {
      fs.mkdirSync(dir + path.sep + site);
    }
    crawlSite(result[site]);
  }
});
