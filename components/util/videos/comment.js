import { Button, Form, InputGroup } from "react-bootstrap";
import FormInput from "../inputs/form-input";
import { saveComment } from "../../../fetching/comments";
import { useSelector } from "react-redux";
import SingleComment from "./singleComment";
import styles from "../../../styles/comment.module.css";
import AuthAlerts from "../views/auth-alerts";
import { useState } from "react";

//=========================================================

const Comment = (props) => {
  //----------------initional data and states----------------
  const userId = useSelector((state) => state.user.userInfo.id);
  const postId = props.postId;
  const [errMsg, setErrMsg] = useState(null);
  //---------------------------------------------------------
  const handleSendComment = async (e) => {
    e.preventDefault();
    if (userId) {
      const form = new FormData(e.target);
      const comment = form.get("comment");
      const commentInfo = {
        writer: userId,
        postId: postId,
        content: comment,
      };
      saveComment(commentInfo)
        .then((newComment) => {
          e.target.reset();
          props.refreshFunction(newComment);
        })
        .catch((err) => console.log(err));
    } else {
      setErrMsg("برای ثبت نظر ، ابتدا وارد حساب کاربری خود شوید ");
    }
  };

  return (
    <>
      {/* -------------comment form------------- */}

      <p className="mt-5">دیدگاه ها</p>
      {errMsg && <AuthAlerts errMsg={errMsg} />}
      <Form onSubmit={handleSendComment}>
        <InputGroup.Text>
          <FormInput
            name="comment"
            type="textarea"
            text="نطر خود را وارد کیند "
          />
          <Button
            style={{ marginTop: "-7px", marginRight: "3px" }}
            type="submit"
          >
            ارسال
          </Button>
        </InputGroup.Text>
      </Form>

      <hr />

      {/* -------------comment list ------------- */}
      {props.commentList &&
        props.commentList.map(
          (comment, index) =>
            !comment.responseTo && (
              <>
                <SingleComment
                  key={index}
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
              </>
            )
        )}
    </>
  );
};

export default Comment;
