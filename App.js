const http = require('http');
const fs = require('fs');

//call by node.js for each response/ request to the server
const server = http.createServer((req, res) => {

    console.log(req.url, req.method, req.headers);
    //process.exit();// it will exit the server event loop after each request

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="myName"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end(); //to exit after executing this code
    }

    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'dummy');
        res.statusCode = 302;
        res.setHeader('Location', '/'); //To Redirect//it will automatically set the location to our current host Means will redirect us to local host
        return res.end();
    }

    //set response
    res.setHeader('Content-type', 'text/html');//name of header and its value//Because: We are writting HTML code so we need to tell the browser or else it will not know
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my node.js server</h1></body>');
    res.write('</html>');
    res.end();
});
            //port number
server.listen(3000);