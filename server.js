// Setup
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const jsonfile = require('jsonfile');
var SpotifyWebApi = require('spotify-web-api-node');
const config = require('./server/config/config.json');

app.use(cors());

// Configuration
const dataFile = './server/config/data.json'

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'www'))); // Static path to compiled Ionic app


// Routes
app.get('/api/data', (req, res) => {
    jsonfile.readFile(dataFile, (error, data) => {
        if (error) data = [];
        res.json(data);
    });
});

app.post('/api/add', (req, res) => {
    jsonfile.readFile(dataFile, (error, data) => {
        if (error) data = [];
        data.push(req.body);

        jsonfile.writeFile(dataFile, data, { spaces: 4 }, (error) => {
            if (error) throw err;
            res.status(200).send();
        });
    });
});

app.post('/api/delete', (req, res) => {
    jsonfile.readFile(dataFile, (error, data) => {
        if (error) data = [];
        data.splice(req.body.index, 1);

        jsonfile.writeFile(dataFile, data, { spaces: 4 }, (error) => {
            if (error) throw err;
            res.status(200).send();
        });
    });
});

app.get('/api/token', (req, res) => {
    // Retrieve an access token from Spotify
    var spotifyApi = req.query.device === 'Basil'
        ? new SpotifyWebApi({
            clientId: config['spotify-elias'].clientId,
            clientSecret: config['spotify-elias'].clientSecret
        })
        : new SpotifyWebApi({
            clientId: config['spotify-andrea'].clientId,
            clientSecret: config['spotify-andrea'].clientSecret
        });

    spotifyApi.clientCredentialsGrant().then(
        function (data) {
            res.status(200).send(data.body['access_token']);
        },
        function (err) {
            console.log(
                'Something went wrong when retrieving a new Spotify access token',
                err.message
            );

            res.status(500).send(err.message);
        }
    );
});

app.get('/api/sonos', (req, res) => {
    const configKey = req.query.device === 'Basil'
        ? 'sonos-api-elias'
        : 'sonos-api-andrea';

    // Send server address and port of the node-sonos-http-api instance to the client
    res.status(200).send(config[configKey]);
});

// Catch all other routes and return the index file from Ionic app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'www/index.html'));
});

// listen (start app with 'node server.js')
app.listen(8200);
console.log("App listening on port 8200");