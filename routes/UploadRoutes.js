import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import csv from "fast-csv";
import Asset from "../models/ProductModel.js";

const router = express.Router();

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/csv", upload.single("uploadcsv"), (req, res) => {
  let assets = [];
  let path = __dirname + "/uploads/" + req.file.filename;

  fs.createReadStream(path)
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => {
      throw error.message;
    })
    .on("data", (row) => {
      assets.push(row);
    })
    .on("end", () => {
      Asset.insertMany(assets)
        .then((data) => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
            data
          });
          // console.log(data)
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
          // console.log(error)
        });
    });
});

export default router;
