import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import Photo from "../models/Photo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getAllPhotos(req, res) {
  const page = req.query.page || 1;
  const photosPerPage = 3;
  const totalPhotos = await Photo.find().countDocuments();
  const photos = await Photo.find({})
    .sort("-dateCreated")
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);

  res.render("index", {
    photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage),
  });
}

export async function getPhoto(req, res) {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", { photo });
}

export async function createPhoto(req, res) {
  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = path.normalize(
    __dirname + "/../public/uploads/" + uploadImage.name
  );

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadImage.name,
    });
    res.redirect("/");
  });
}

export async function updatePhoto(req, res) {
  const photo = await Photo.findById(req.params.id);
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
}

export async function deletePhoto(req, res) {
  const photo = await Photo.findById(req.params.id);
  let deleteImage = path.normalize(__dirname + "/../public" + photo.image);
  fs.unlinkSync(deleteImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect("/");
}
