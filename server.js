const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.static('src'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
});
