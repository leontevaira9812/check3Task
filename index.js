import express from "express";
import multer from "multer";
import sizeOf from "image-size";
import sharp from "sharp";
import fs from "fs";

const app = express();

const img = multer({
  dest: "./img",
});

app
  .set("view engine", "ejs")
  .set("views", "views")
  .get("/", (r) => r.res.render("./index"))
  .post("/size2json", img.single("image"), async (r) => {
    const tempPath = r.file.path;
    sizeOf(tempPath, function (err, dimensions) {
      r.res.send({
        width: dimensions.width,
        height: dimensions.height,
      });
    });
  })
  .get("/makeimage?", (r) => {
    const width = parseInt(r.query.width);
    const height = parseInt(r.query.height);
    sharp("./img/ALX_ICON.png")
      .resize(width, height)
      .toFile("./img/output.png", (err, info) => {
        r.res.download("./img/output.png");
      });
  })
  .all("/login", (r) => r.res.send("andreeva.anna2909"))
  .listen(process.env.PORT || 3000, () => {
    console.log("Server is working");
  });
