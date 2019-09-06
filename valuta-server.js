/*
    test-server.js
    {
	    "_group" : "One",
	    "_action" : "Latest"
    }
*/

const http = require('http')
const fs = require('fs')
const fetch = require('node-fetch')

var noOfHome = 0;
var server = http.createServer(function (req, resp) {

    if (req.method === 'GET') {

        if (req.url === "/") {
            fs.readFile("index.html", function (error, page) {
                if (error) {
                    resp.writeHead(404)
                    resp.write('Sidan kan inte hittas')
                } else {
                    noOfHome++;
                    console.log("Home: " + noOfHome)
                    resp.writeHead(200, { 'Content-Type': 'text/html' })
                    resp.write(page)
                }

                resp.end();
            });
        } else if (req.url === "/om-oss") {
            fs.readFile("about-us.html", function (error, page) {
                if (error) {
                    resp.writeHead(404)
                    resp.write('Sidan kan inte hittas')
                } else {
                    noOfHome++;
                    console.log("Home: " + noOfHome)
                    resp.writeHead(200, { 'Content-Type': 'text/html' })
                    resp.write(page)
                }
                resp.end();
            });
        } else if (req.url === "/js/helper.js") {
            console.log('read.js');

            fs.readFile('js/helper.js', 'utf8', function (err, data) {
                resp.writeHead(200, { 'Content-Type': 'text/html' })
                resp.write(data)
                resp.end()
                console.log('Return');
            });

        } else {
            resp.writeHead(404)
            resp.write('Sidan kan inte hittas')
            resp.end()
        }
    }
    else
        if (req.method === 'POST') {
            let body = '';
            req.on('data', param => {
                body += param.toString(); // convert Buffer to string
            });
            req.on('end', () => {
                //console.log(body);
                var data = JSON.parse(body);
                if (data._action == "One") {
                    var fetchCall;
                    if (data.date == 'Latest') {
                        fetchCall = 'https://api.exchangeratesapi.io/latest?base=SEK'
                    } else {
                        fetchCall = 'https://api.exchangeratesapi.io/' + data.date + '?base=SEK'
                    }

                    fetch(fetchCall)
                        .then((resp) => resp.json())
                        .then((data) => {
                            resp.statusCode = 200;
                            resp.setHeader('Content-Type', 'application/json; charset=utf-8');
                            resp.end(JSON.stringify(data));
                        })
                }
                else if (data._action == "Compare") {
                    var reply = {};
                    reply.data1 = data.date1;
                    reply.data2 = data.date2;
                    var fetchCall = "https://api.exchangeratesapi.io/" + data.date1 + "?symbols=SEK," + data.currency;
                    console.log(fetchCall);
                    fetch(fetchCall)
                        .then((resp) => resp.json())
                        .then((date1) => {

                            resp.statusCode = 200;
                            resp.setHeader('Content-Type', 'application/json; charset=utf-8');
                            reply.

                                resp.end(JSON.stringify(reply));
                        })
                }

            });
        }
        else {
            // No allowed
        }
})

server.listen(5050)

console.log('Server Started listening on 5050')