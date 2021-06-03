const express = require('express');

const path = require('path');

const app = express();
const PORT = 3000;
// const distFolder = `${__dirname}/dist/`;
// app.use(express.static(distFolder));
// app.get('*', (request, response) => {
//   response.sendFile(path.resolve(`${distFolder}index.html`));
// });
app.use(express.static('./dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
