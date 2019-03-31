const express = require('express');
const path = requite('path');

const app = express();

app.use(express.static(__dirname + '/dist/CarTracker'));
app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname + 'dist/CarTracker/index.html'));
});

app.listen(process.env.PORT || 8080);