import Photo from "../models/Photo";

export function getAboutPage(req, res) {
  res.render("about");
}

export function getAddPage(req, res) {
  res.render("add");
}

export async function getEditPage(req, res) {
  const photo = await Photo.findById(req.params.id);
  res.render("edit", { photo });
}
