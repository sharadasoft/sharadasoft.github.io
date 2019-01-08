const child_process = require('child_process');

urls = ['http://www.yelp.com/biz/homeslice-pizza-london',
'http://www.yelp.com/biz/homeslice-pizza-london?start=20',
'http://www.yelp.com/biz/homeslice-pizza-london?start=40',
'http://www.yelp.com/biz/homeslice-pizza-london?start=60',
'http://www.yelp.com/biz/homeslice-pizza-london?start=80',
'http://www.yelp.com/biz/homeslice-pizza-london?start=100'];


for(var i=0; i<urls.length; i++) {
   var workerProcess = child_process.exec('node scraping.js '+urls[i],
      function (error, stdout, stderr) {
         if (!error) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
         }
         else{
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
         }
      });

      workerProcess.on('exit', function (code) {
         console.log('Child process exited with exit code '+code);
      });
}