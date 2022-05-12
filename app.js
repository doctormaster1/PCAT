import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import methodOverride from "method-override";

import {
  getAllPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from "./controllers/photoControllers";
import {
  getAboutPage,
  getAddPage,
  getEditPage,
} from "./controllers/pageControllers";

const app = express();

// DB Connect
mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Logger middleware
const myLogger = (req, res, next) => {
  console.log("Log: " + req.url.split());
  next();
};

// Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
app.use(myLogger);

// Photo Route
app.get("/", getAllPhotos);
app.get("/photos/:id", getPhoto);
app.post("/photos", createPhoto);
app.put("/photos/:id", updatePhoto);
app.delete("/photos/:id", deletePhoto);

// Page Route
app.get("/about", getAboutPage);
app.get("/add", getAddPage);
app.get("/photos/edit/:id", getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
