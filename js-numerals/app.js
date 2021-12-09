const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const convert = require("./service/convert");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', {data : "", number : ""});
})

app.post('/', (req, res) => {
    let data = convert.convertToPhrase(req.body.number);
    res.render('index', {data : data, number : req.body.number})
})


app.listen(port, () => {
  console.log(`Server started... http://localhost:${port}`);
})