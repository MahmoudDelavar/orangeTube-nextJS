import Image from "next/image";
import styles from "../../../styles/comment.module.css";
import { FaReply } from "react-icons/fa";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormInput from "../inputs/form-input";
import { saveComment } from "../../../fetching/comments";
import { useSelector } from "react-redux";
import LikeAndDislike from "./like-dislike";

//====================================================
const SingleComment = (props) => {
  //----------------initional data and states----------------
  const userId = useSelector((state) => state.user.userInfo.id);

  //-------------------------
  return (
    <div className={styles.box}>
      <div className={styles.singleCommentBox}>
        <div>
          <Image
            className={styles.image}
            src={props.comment.writer.avatarPath}
            alt="failed"
            width={50}
            height={50}
          />
        </div>
        <div>
          <span className={styles.userName}>
            {props.comment.writer.userName}
          </span>
          <br />
          <span className={styles.text}> {`" ${props.comment.content} "`}</span>
          <br />
        </div>
      </div>
      <LikeAndDislike comment commentId={props.comment._id} />
    </div>
  );
};

export default SingleComment;
