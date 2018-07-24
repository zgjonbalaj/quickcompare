const crawler    = require('easycrawler');

module.exports = {

	crawl: function(url) {
		var crawler = new crawler({
			thread: 5,
			logs: false,
			depth: 10,
			headers: { 'user-agent': 'LogikBarn Crawler: DevTest' },
			onlyCrawl: [url],
			reject: ['?'],
			onSuccess: function(data) {
				console.log("[ FOUND ] => " + data.url);
			},
			onError: function(data) {
				console.log("[ ERROR ] => " + data.url);
			},
			onFinished: function(urls) {
				console.log("\n" + "== [ END OF SPIDER ] ==" + "\n");

				var crawledUrls    = urls.crawled.toString().split(',');
				var discoveredUrls = urls.discovered.toString().split(',');

				discoveredUrls = discoveredUrls.filter(function(item, pos) {
					return discoveredUrls.indexOf(item) == pos;
				})

				for(var i = 0; i < discoveredUrls.length; i++) {
					console.log("[ DISCOVERED ] => " + discoveredUrls[i]);
				}

				console.log("\n" + " == [ END OF DISCOVERED ] ==".data + "\n");

				for(var i = 0; i < crawledUrls.length; i++) {
					console.log("[ CRAWLED ] => " + crawledUrls[i]);
				}

				console.log("\n" + " == [ END OF CRAWL ] ==" + "\n");

				// generateScreenshots(site, crawledUrls, function() {
				//   console.log('finished screenshot generation');
				// });
			}
		});
		crawler.crawl(url);
	},
}

