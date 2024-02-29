const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/dist/service-manager-app'))

app.get('/ping', function (req, res)
{
    return res.send('pong');
});

app.get('/*', function (req, res)
{
    res.sendFile(path.join(__dirname + '/dist/service-manager-app/index.html'));
});

app.listen(port, function ()
{
    console.info('Angular Server App listening on port ' + port);
});



/*//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
//app.use(express.static('./dist/service-manager-app'));
app.use(express.static(path.join(__dirname, 'dist','service-manager-app')));

app.get('/!*', (req, res) =>
    /!*res.sendFile('index.html', {root: 'dist/service-manager-app/'}),*!/
    res.sendFile(path.join(__dirname,'dist','service-manager-app','index.html'))
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);*/



/*//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/angular-app-heroku'));

app.get('/!*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/angular-app-heroku/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);*/
