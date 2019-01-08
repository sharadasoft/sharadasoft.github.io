var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var data=[];
var cname, comments;

    request(process.argv[2], function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            $('ul.reviews > li').each(function(i){
                cname = $(this).find(".user-display-name").text();
                comments = $(this).find("p[itemprop='description']").text();
                data[i] = {'cname': cname, 'comments': comments};
                fs.appendFile('output.json', JSON.stringify(data, null, 4), function(err){})
            });
            }

    });



