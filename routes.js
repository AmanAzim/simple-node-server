const fs = require('fs');


const requestHandler = (req, res) => {

    //console.log(req.url, req.method, req.headers);
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
        const body = [];

        req.on('data', (chunk) => { //This event listner listen to incoming data from user input as a chunks
           console.log('chunk', chunk);
           body.push(chunk);
        });
        return req.on('end', () => { // We return from this line so that this func gets executed exit from this event loop round

            const parsedBody = Buffer.concat(body).toString();//After the incoming chunk is completed then we can add it to the Buffer object
            console.log('parsedBody', parsedBody);
            const message = parsedBody.split('=')[1];

            //fs.writeFileSync('message.txt', message);//Syanchoronous file writter method

            fs.writeFile('message.txt', message, (error) => {//Callback to be called after writting the user input in the file is done

                res.statusCode = 302;
                res.setHeader('Location', '/'); //To Redirect//it will automatically set the location to our current host Means will redirect us to local host
                return res.end();

            });//Asyanchoronous file writter method
        });
    }

     //set response
    res.setHeader('Content-type', 'text/html');//name of header and its value//Because: We are writting HTML code so we need to tell the browser or else it will not know
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my node.js server</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler;

/*
module.exports = {
    handler: requestHandler,
    someText: 'hard coded text',
};
to import:  const { handler, someText } = require('./....');
*/

//module.export.handler = requestHandler
//export.handler = requestHandler