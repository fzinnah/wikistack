const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const port = 1234;
const layout = require("./views/layout");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.get('/', (req, res)=>{
    res.send(layout(""));
})


app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})