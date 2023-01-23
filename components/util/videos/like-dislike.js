import { useEffect, useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  getDisLikes,
  getLikes,
  unDisLike,
  unLike,
  upDisLike,
  upLike,
} from "../../../fetching/like-dislike";

//===============================================

const LikeAndDislike = (props) => {
  //----------------initional data and states----------------
  const userId = useSelector((state) => state.user.userInfo.id);
  const [likes, setLikes] = useState(0);
  const [disLikes, setDisLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  //------------checked come from video or comment------------
  let info = {};
  if (props.video) {
    info = {
      videoId: props.videoId,
      userId: userId,
    };
  } else {
    info = {
      commentId: props.commentId,
      userId: userId,
    };
  }

  //--calculate number of like and dislike for this post or comment--
  useEffect(() => {
    //----------------like actions----------------
    getLikes(info)
      .then((likes) => {
        //__set number of likes__
        setLikes(likes.length);

        //__check already liked this video/comment or not__
        likes.map((like) => {
          if (like.userId === userId) setIsLiked(true);
        });
      })
      .catch((err) => console.log(`cant calculate likes:${err}`));

    //--------------DisLike actions--------------
    getDisLikes(info)
      .then((dislikes) => {
        //__set number of disLikes__
        setDisLikes(dislikes.length);

        //__check already DisLiked this video/comment or not__
        dislikes.map((disLike) => {
          if (disLike.userId === userId) setIsLiked(true);
        });
      })
      .catch((err) => console.log(`cant calculate DisLikes:${err}`));
  }, []);
  //---------------------------------------
  const onDislike = () => {
    if (isDisliked) {
      //--hadle unDislike
      unDisLike(info).then((response) => {
        if (response.data.isSuccess) {
          setDisLikes(disLikes - 1);
          setIsDisliked(!isDisliked);
        } else {
          console.log("failed to decrease dislike");
        }
      });
    } else {
      //--hadle upDislike
      upDisLike(info).then((response) => {
        if (response.data.isSuccess) {
          setDisLikes(disLikes + 1);
          setIsDisliked(!isDisliked);
          // setIsLiked(false);

          // if dislike button is already clicked
          if (isLiked) {
            setIsLiked(false);
            setLikes(likes - 1);
          }
        } else {
          console.log("failed to increase dislike");
        }
      });
    }
  };

  //---------------------------------------
  const onLike = () => {
    if (!isLiked) {
      //--hanlde upLike
      upLike(info).then((response) => {
        if (response.data.isSuccess) {
          setLikes(likes + 1);
          setIsLiked(!isLiked);
          setIsDisliked(false);
          //--if dislike button is already clicked
          if (isDisliked) {
            setDisLikes(disLikes - 1);
            setDisLikes(false);
          }
        } else {
          console.log("failed to increse the like");
        }
      });
    } else {
      //-- alrady liked -> handle unlike--
      unLike(info).then((response) => {
        if (response.data.isSuccess) {
          setLikes(likes - 1);
          setIsLiked(!isLiked);
        }
      });
    }
  };
  //---------------------------------------

  return (
    <>
      <span onClick={onDislike} style={{ paddingLeft: "10px" }}>
        {disLikes}
        {!isDisliked ? (
          <AiOutlineDislike style={{ cursor: "pointer" }} />
        ) : (
          <AiFillDislike style={{ cursor: "pointer" }} />
        )}
      </span>

      <span onClick={onLike}>
        {likes}
        {!isLiked ? (
          <AiOutlineLike style={{ cursor: "pointer" }} />
        ) : (
          <AiFillLike style={{ cursor: "pointer" }} />
        )}
      </span>
    </>
  );
};

export default LikeAndDislike;
