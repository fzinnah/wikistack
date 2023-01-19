const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = 1234;
const layout = require("./views/layout");
const { db, Page, User } = require("./models");
const wikiRouter = require('./routes/wiki');
// const userRouter = require('./routes/users');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.use('/wiki', wikiRouter);

app.get("/", (req, res) => {
    res.redirect('/wiki');
});

const init = async () => {
  await db.sync({ force: true });
  // make sure that you have a PORT constant
  db.authenticate().then(() => {
    console.log("connected to the database");
  });
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
