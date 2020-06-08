/**
 * Server for Serving the Build Folder and enabling BrowserRouter
 */
const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(4046, () => {
    console.log('Server started on port http://localhost:4046');
});
