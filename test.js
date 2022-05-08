import mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model("Photo", PhotoSchema);
/*
await Photo.create({
  title: "Photo Title 3",
  description: "Lorem 3",
});

Photo.find({}, (err, data) => {
  if (err) console.error(err);
  console.log(data);
});
*/
const id = "6276e19732b59e93b16c0115";

await Photo.findByIdAndUpdate(
  id,
  { description: "Lorem Updated 2" },
  (err, data) => {
    if (err) console.error(err);
    console.log(data);
  }
);
