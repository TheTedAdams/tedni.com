var express = require('express');
var app = express();

app.use(express.compress()); // gzip content

app.use(express.static(__dirname + '/src', { maxAge: 86400000 })); // Cached for one day

app.listen(process.env.PORT || 3417);