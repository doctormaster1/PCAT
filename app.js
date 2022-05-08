import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const myLogger = (req, res, next) => {
  console.log("Middleware log: " + req.url.split());
  next();
};

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(myLogger);

app.get("/", (req, res) => {
  //res.sendFile(path.resolve(__dirname + "/temp/index.html"));
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render('about');
});

app.get("/add", (req, res) => {
  res.render('add');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
