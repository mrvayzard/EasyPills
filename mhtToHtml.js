/**
 * Created by Vayzard on 17.05.2017.
 */
var fs = require('fs');
var request = require('request');
var download = require('download-file');

var flag = true;
var style = true;
/** Using the readFile API - Asynchronous */

// function convert(source, savePath) {
//         savePath = 'temp/temp.html';
//         download(source, 'temp/temp.mht', function(){
//         console.log('done');
//         fs.writeFile(savePath, "", function () {
//             fs.readFile('temp/temp.mht', "utf8", function(err, data) {
//                 data.toString().split("=\r\n").forEach(function (temp) {
//                     temp = temp.replace(/=3D/g, "=");
//                     if(temp.toString().indexOf('<html') > -1)
//                         fs.appendFileSync(savePath, temp.toString().substring(temp.toString().indexOf('<html')));
//                     else if(temp.toString().indexOf('html>') > -1 ) {
//                         fs.appendFileSync(savePath, temp.toString().substring(0, temp.toString().indexOf('html>') + 5));
//                         flag = false;
//                     }
//                     else if (flag) fs.appendFileSync(savePath, temp);
//                 });
//             });
//         });
//     });
// }

// function download(uri, filename, callback){
//     request.head(uri, function(err, res, body){
//         request(uri).pipe(fs.createWriteStream(filename, "utf8")).on('close', callback);
//     });
// };

var options = {
    directory: 'public/tempFiles/',
    filename: "temp.mht"
}

module.exports = {
    convertToFile: function (source, savePath) {
        flag = true;
        style = true;
        var count =0;
        savePath = 'public/tempFiles/temp.html';
        download(source, options, function(){
            console.log('done');
            fs.writeFile(savePath, "", function () {
                fs.readFile('public/tempFiles/temp.mht', "utf8", function(err, data) {
                    data.toString().split("=\r\n").forEach(function (temp) {
                        console.log(temp);
                        temp = temp.replace(/=3D/g, "=").replace(/<a/g, "<span").replace(/a>/g, "span>");
                        console.log(temp);
                        if(temp.toString().indexOf('<html') > -1)
                            fs.appendFileSync(savePath, temp.toString().substring(temp.toString().indexOf('<html')));
                        else if(temp.toString().indexOf('html>') > -1 ) {
                            fs.appendFileSync(savePath, temp.toString().substring(0, temp.toString().indexOf('html>') + 5));
                            flag = false;
                        }

                        else if(temp.toString().indexOf('<style>') > -1 && count<1) {
                            fs.appendFileSync(savePath, temp.toString().substring(0, temp.toString().indexOf('<style>')));
                            style = false;
                        }
                        else if(temp.toString().indexOf('</style>') > -1 && count<1) {
                            fs.appendFileSync(savePath, temp.toString().substring(temp.toString().indexOf('</style>') + 5));
                            style = true;
                            count++;
                        }

                        else if (flag && style) fs.appendFileSync(savePath, temp);
                    });
                });
            });
        });
    }
};