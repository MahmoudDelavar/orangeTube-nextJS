const controller = require("../controller");
const debug = require("debug")("app:main");
//====================================

module.exports = new (class extends controller {
  //-----------------------------------------------------------------
  //                             likes
  //-----------------------------------------------------------------
  //-------------------------calculate likes-------------------------
  async getLikes(req, res) {
    let info = {};
    if (req.body.videoId) {
      info = { videoId: req.bodyvideoId, userId: req.body.userId };
    } else {
      info = { commentId: req.body.commentId, userId: req.body.userId };
    }
    this.Like.find(info).exec((err, likes) => {
      if (err) {
        return this.response({
          res,
          code: 400,
          isSuccess: false,
          message: "can't finde likes",
        });
      }
      this.response({
        res,
        code: 200,
        isSuccess: true,
        message: "successfuly loaded likes",
        data: likes,
      });
    });
  }

  //------------------------------UpLike------------------------------
  async upLike(req, res) {
    let info = {};
    if (req.body.videoId) {
      info = { videoId: req.bodyvideoId, userId: req.body.userId };
    } else {
      info = { commentId: req.body.commentId, userId: req.body.userId };
    }
    //---------save Like information to mongoDB---------
    const like = new this.Like(info);
    like.save((err, like) => {
      if (err) {
        return this.response({
          res,
          code: 400,
          isSuccess: false,
          message: `cant be save like information:${err}`,
        });
      }
      //--if dislLike Button is already clicked , decrese the DisLikes by 1 --
      this.DisLike.findOneAndDelete(info).exec((err, dislike) => {
        if (err) {
          return this.response({
            res,
            code: 400,
            isSuccess: false,
            message: `cant be delet dislike information:${err}`,
          });
        }
        this.response({
          res,
          code: 200,
          isSuccess: true,
          message: "deleted one dislike information:",
        });
      });
    });
  }
  //------------------------------UnLike------------------------------
  async unLike(req, res) {
    let info = {};
    if (req.body.videoId) {
      info = { videoId: req.bodyvideoId, userId: req.body.userId };
    } else {
      info = { commentId: req.body.commentId, userId: req.body.userId };
    }

    this.Like.findOneAndDelete(info).exec((err, result) => {
      if (err) {
        return this.response({
          res,
          code: 400,
          isSuccess: false,
          message: `can't be delete like info:${err}`,
        });
      }

      this.response({
        res,
        code: 200,
        isSuccess: true,
        message: "delete one like info",
      });
    });

    //---save UnLike information to mongoDB---
    //when unlike checked we should decrise from number of likes
  }

  //-----------------------------------------------------------------
  //                            DisLikes
  //-----------------------------------------------------------------
  //-----------------calculate Dislikes-----------------
  async getDisLikes(req, res) {
    let info = {};
    if (req.body.videoId) {
      info = { videoId: req.bodyvideoId, userId: req.body.userId };
    } else {
      info = { commentId: req.body.commentId, userId: req.body.userId };
    }
    this.DisLike.find(info).exec((err, disLikes) => {
      if (err) {
        return this.response({
          res,
          code: 400,
          isSuccess: false,
          message: "can't finde disLikes",
        });
      }
      this.response({
        res,
        code: 200,
        isSuccess: true,
        message: "successfuly loaded likes",
        data: disLikes,
      });
    });
  }

  //----------------------UnDisLike----------------------
  async unDisLike(req, res) {
    let info = {};
    if (req.body.videoId) {
      info = { videoId: req.bodyvideoId, userId: req.body.userId };
    } else {
      info = { commentId: req.body.commentId, userId: req.body.userId };
    }

    this.DisLike.findOneAndDelete(info).exec((err, result) => {
      if (err) {
        return this.response({
          res,
          code: 400,
          isSuccess: false,
          message: `can't be delete Dislike info:${err}`,
        });
      }

      this.response({
        res,
        code: 200,
        isSuccess: true,
        message: "delete one Dislike info",
      });
    });
  }

  //----------------------UpDisLike----------------------
  async upDisLike(req, res) {
    let info = {};
    if (req.body.videoId) {
      info = { videoId: req.bodyvideoId, userId: req.body.userId };
    } else {
      info = { commentId: req.body.commentId, userId: req.body.userId };
    }
    //---save DisLike information to mongoDB---
    const dislike = new this.DisLike(info);
    dislike.save((err, dislike) => {
      if (err) {
        return this.response({
          res,
          code: 400,
          isSuccess: false,
          message: `cant be save Dislike information:${err}`,
        });
      }
      //--if Like Button is already clicked , decrese the likes by 1 --
      this.Like.findOneAndDelete(info).exec((err, like) => {
        if (err) {
          return this.response({
            res,
            code: 400,
            isSuccess: false,
            message: `cant be delet like information:${err}`,
          });
        }
        this.response({
          res,
          code: 200,
          isSuccess: true,
          message: "deleted one like information:",
        });
      });
    });
  }
})();
