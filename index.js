const express = require('express');
const serveStatic = require('serve-static');
const port = 3000;
const app = express();
app.use(serveStatic(__dirname));
app.listen(port);
console.log('now serving on port ' + port);
