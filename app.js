import express from "express";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import Photo from "./models/Photo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const myLogger = (req, res, next) => {
  console.log("Middleware log: " + req.url.split());
  next();
};

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(myLogger);

app.get("/", async (req, res) => {
  const photos = await Photo.find({});
  res.render("index", { photos });
});

app.get("/photos/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", { photo });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/photos", async (req, res) => {
  await Photo.create(req.body);
  res.redirect("/");
});

app.get("/video-page", (req, res) => {
  res.render("photo");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
