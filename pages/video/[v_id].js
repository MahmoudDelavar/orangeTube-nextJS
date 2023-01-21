import { Container, Row, Col } from "react-bootstrap";
import { getAllVideos, getVideoById } from "../../fetching/videoFetchig";
import styles from "../../styles/sidebarVideo.module.css";
import SidebarVideo from "../../components/util/videos/sidebar-video";
import Subscribe from "../../components/util/videos/subscribe";
import { useSelector } from "react-redux";
import Comment from "../../components/util/videos/comment";
import { useEffect, useState } from "react";
import { getComments } from "../../fetching/comments";
//===========================================
const VideoByID = (props) => {
  //-----------------initional data and state-----------------
  const { selectedVideo, allVideos, videoId } = props;
  const userFrom = useSelector((state) => state.user.userInfo.id);
  const [commentList, setCommentList] = useState([]);

  //----------------------------------------------------------
  useEffect(() => {
    getComments(videoId)
      .then((loadedComments) => {
        setCommentList(loadedComments);
      })
      .catch((err) => console.log(err));
  });
  //----------------------------------------------------------

  //-update comment component (send new comment to show in commentList)-
  const updateComment = (newComment) => {
    setCommentList(newComment);
  };
  //----------------------------------------------------------

  if (!selectedVideo) {
    return <>loading...</>;
  }
  return (
    <>
      <Container fluid>
        <Row className="text-center">
          {/* -----------------video palayer----------------- */}
          <Col lg={9} className="bg-green">
            <video
              className={styles.videoPlayer}
              controls
              src={`/uploads/videos/${selectedVideo.fileName}`}
            ></video>

            {/* ------------comments-subscribe------------ */}
            <Subscribe userTo={selectedVideo.writer} userFrom={userFrom} />
            <Comment
              postId={selectedVideo._id}
              refreshFunction={updateComment}
              commentList={commentList}
            />
          </Col>

          {/* ------------------sidebar------------------ */}
          <Col lg={3} className="bg-yellow">
            <p className={styles.otheVideos}>سایر ویدئو ها </p>
            <Row>
              <Col>
                <div className={styles.sidebarBox}>
                  {allVideos.map((video, index) => (
                    <SidebarVideo
                      key={index}
                      title={video.title}
                      thumbnail={video.thumbnail}
                      duration={video.duration}
                      description={video.description}
                      videoId={video._id}
                    />
                  ))}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VideoByID;

//===================Server Side===================
export async function getStaticProps(context) {
  const { params } = context;
  const videoId = params.v_id;
  //______Load videos and find selected video_____//
  const { videos } = await getAllVideos();
  const videoByID = await videos.find((video) => video._id == videoId);

  // //______Load this post comments_____//
  const comments = await getComments(videoId);

  return {
    props: {
      allVideos: videos,
      selectedVideo: videoByID,
      videoId,
      // loadedComments: comments,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { v_id: "63bd170ce45044549a172092" } }],
    fallback: true,
  };
}
