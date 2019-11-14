const http = require('http');

const routes = require('./routes');

//call by node.js for each response/ request to the server
const server = http.createServer(routes);
            //port number
server.listen(3000);