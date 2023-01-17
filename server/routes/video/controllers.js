const { validationResult } = require("express-validator");
const controller = require("../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { dev_phase } = require("../../../next.config");
const multer = require("multer");
const debug = require("debug")("app:main");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
// const { ffprobe } = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe");
ffmpeg.setFfprobePath("C:\\ffmpeg\\bin\\ffprobe.exe");
//======================================================================
//-----------------------------multer config-----------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/videos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname + "loaded");
    if (ext !== ".mp4") {
      return cb(res.status(400).send("only .mp4 allowed "), false);
    }
    cb(null, true);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: "50mb" },
}).single("file");

//-----------------------------------------------------
let thumbFliePath = "";
let fileDuration = "";

//-----------------------------------------------------
module.exports = new (class extends controller {
  //---------------------load video---------------------
  async uploadVideo(req, res) {
    upload(req, res, (err) => {
      if (err) {
        return this.response({
          res,
          code: 400,
          data: null,
          isSuccess: false,
          message: `cant loade the video: ${err}`,
        });
      }
      this.response({
        res,
        code: 201,
        message: "uploaded Video",
        isSuccess: true,
        data: {
          filePath: res.req.file.path,
          fileName: res.req.file.filename,
        },
      });
    });
  }

  //-----------------generate thumbnail-----------------
  async thumbnail(req, res) {
    ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
      fileDuration = metadata.format.duration;
    });
    ffmpeg(req.body.filePath)
      .on("filenames", function (filenames) {
        thumbFliePath = "/uploads/thumbnails/" + filenames[0];
      })
      .on("end", () => {
        this.response({
          res,
          code: 202,
          isSuccess: true,
          data: { thumbFliePath: thumbFliePath, fileDuration: fileDuration },
          message: "genetare Thumbnail",
        });
      })
      .screenshots({
        // Will take screens at 20%, 40%, 60% and 80% of the video
        count: 1,
        folder: "public/uploads/thumbnails",
        size: "320x240",
        filename: "thumbnail_%b.png",
      });
  }

  //---------------------Add Video---------------------
  async addVideo(req, res) {
    let video = new this.Video({
      writer: req.body.writer,
      title: req.body.title,
      description: req.body.description,
      path: req.body.path,
      category: req.body.category,
      duration: req.body.duration,
      thumbnail: req.body.thumbnail,
      fileName: req.body.fileName,
    });
    await video.save();

    this.response({
      res,
      code: 201,
      isSuccess: true,
      message: "ویدئو با موفقیت ثبت شد",
    });
  }

  //-----------------get All Videos-----------------
  async getAllVideos(req, res) {
    const videos = await this.Video.find()
      .populate("writer")
      .exec((err, videos) => {
        if (err) {
          return this.response({
            res,
            code: 404,
            isSuccess: false,
            message: "not found any video",
            data: null,
          });
        }
        this.response({
          res,
          code: 200,
          isSuccess: true,
          message: "loded All Videos",
          data: { videos },
        });
      });
  }

  //-----------------get All Subscribtion Videos-----------------
  async getSubscribtionVideos(req, res) {
    //------find all users I subscribed------
    const userFrom = req.body.userFrom;

    if (!userFrom) {
      return this.response({
        res,
        code: 400,
        isSuccess: true,
        data: null,
        message: "subscribtions failed",
      });
    }

    const subscrebeds = await this.Subscribe.find({ userFrom }).exec();

    let subscribeUse = [];
    subscrebeds.forEach((u) => subscribeUse.push(u.userTo));

    const videos = await this.Video.find({
      writer: { $in: subscribeUse },
    })
      .populate("writer", "avatarPath userName")
      .exec();
    this.response({
      res,
      code: 200,
      isSuccess: true,
      message: "success",
      data: videos,
    });
  }
})();
