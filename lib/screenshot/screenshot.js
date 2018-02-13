global.webshot    = require('node-webshot');

// Webshot configuration
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

module.exports = {
  
  screenGrab: function(url) {
    webshot(url, nameFile(link), webshotOptions, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('[ PNG SAVED ] => ' + nameFile(link));
      }
    });
  },
}

// function generateScreenshots(baseUrl, linkList, ) {

//   var baseSite = extractHostname(baseUrl);
//   var screensFolder = dir + path.sep + baseSite;

//   if(!fs.existsSync(screensFolder)) {
//     fs.mkdirSync(screensFolder);
//   }

//   linkList.forEach(function(link) {
//     webshot(link, nameFile(link), webshotOptions, function(err) {
//       if(err) {
//         console.log(err);
//       } else {
//         console.log('[ PNG SAVED ] => ' + nameFile(link));
//       }
//     });
//   });

// }


