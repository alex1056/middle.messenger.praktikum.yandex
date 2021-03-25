const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.static(`${__dirname}/dist1`));

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}!`);
});
