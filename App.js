const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//parses the raw request body sent through <form>
app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
     res.send(`
        <form action="/product" method="post">
            <input type="text" name="productTitle">
            <button type="submit">Add</button>
        </form>
      `);
});

app.use('/product', (req, res, next) => {
    console.log('Request body', req.body);
    res.redirect('/');
});

//all the incoming request will go through this middleware
app.use('/', (req, res, next) => {
     res.send('<h1>Hello Express.js</h1>');//sent response, let attach a body of any type default is "text/html" and to change we need to use "res.setHeader()"// also res.setHeader and res.write() also possible//
    //next();// to allow the request to travel to the next middleware
});


app.listen(3000);//same as the below 2 lines
//call by node.js for each response/ request to the server
//const server = http.createServer(app);
//server.listen(3000);