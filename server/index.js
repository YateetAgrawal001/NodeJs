const http = require('http')
const fs = require('fs')
const url = require("url")

const myserver = http.createServer((req,res) => {
    const log = `${Date.now()} : ${req.method} ${req.url} New Req Recieved\n`;
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    fs.appendFile("log.txt",log, (err,data) => {
        switch(myUrl.pathname){
            case '/': 
                if(req.method === 'GET') res.end("Homepage");
                break;
            case '/about':
                const username = myUrl.query.myname;
                res.end(`Hi, ${username}`);
                break;
                case '/search':
                    const search = myUrl.query.search_query;
                    res.end("Welcome your search is " + search);
                    break;
                //this is for HTTP methods
                case '/signup':
                    if(req.method === "GET") res.end("This is a signup form");
                    else {
                        //DB query 
                        res.end("signup succesfull")
                    }
            default:
                res.end("404 page not found")
        }
    });
});

myserver.listen(4000, () => {
    console.log("server started");
})