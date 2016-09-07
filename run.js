var child_process = require('child_process');
var glob = require("glob")

/*
  Run this script with a glob pattern like:
  node run.js "reg-flows/search-results/fav-home-sign*.js"
*/

glob(process.argv[2], {}, function (er, files) {
  files.forEach(function(file) {
    child_process.exec('node '+file+' | faucet', function (err, stdout, stderr){
      if (err) {
        console.log("child processes failed with error code: " +
          err.code);
      }
      console.log(stdout);
    });
  })
})
