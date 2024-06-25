const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 4000; // Changed port from 3000 to 4000

app.use(bodyParser.json());
app.use(cors());

const VERSION_FILE = './version.json';

app.get('/api/version', (req, res) => {
    fs.readFile(VERSION_FILE, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading version file');
        }
        res.send(JSON.parse(data));
    });
});

app.post('/api/version', (req, res) => {
    const newVersionData = req.body;
    fs.writeFile(VERSION_FILE, JSON.stringify(newVersionData, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error writing version file');
        }
        res.send('Version updated successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
