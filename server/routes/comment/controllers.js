const { validationResult } = require("express-validator");
const { useFileSystemPublicRoutes } = require("../../../next.config");
const controller = require("../controller");
const debug = require("debug")("app:main");
//====================================

module.exports = new (class extends controller {
  //----------------------save Comment----------------------
  async saveComment(req, res) {
    const { writer, postId, responseTo, content } = req.body;

    let comment = new this.Comment({
      writer,
      postId,
      responseTo,
      content,
    });

    comment.save((err, comment) => {
      if (err) {
        return this.response({
          res,
          code: 400,
          isSuccess: false,
          message: "can't  be saved comment",
        });
      }

      //--populate writer info and send last comment saved to parent Componnent to show it--
      this.Comment.find({ _id: comment._id })
        .populate("writer")
        .exec((err, newComment) => {
          if (err) {
            return this.response({
              res,
              code: 400,
              isSuccess: false,
              message: `can't  be saved commen:${err}`,
            });
          }
          this.response({
            res,
            code: 201,
            isSuccess: true,
            message: "comment saved  and send to parent Component",
            data: newComment,
          });
        });
    });
  }

  //----------------------load Comments----------------------
  async getComments(req, res) {
    const postId = req.body.videoId;

    this.Comment.find({ postId: postId })
      .populate("writer")
      .exec((err, comments) => {
        if (err) {
          return this.response({
            res,
            code: 400,
            isSuccess: false,
            message: `cont't load comments:${err}`,
          });
        }
        this.response({
          res,
          code: 200,
          isSuccess: true,
          data: comments,
        });
      });
  }
})();
