const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 80;

express()
.use(express.static(`${__dirname}/dist`))
.get('*', (request, response) => {
    // handle every other route with index.html, which will contain
    // a script tag to your application's JavaScript file(s).
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
})
.listen(PORT, () => console.log(`Listening on ${PORT}`));
