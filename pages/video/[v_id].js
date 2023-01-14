import { Container, Row, Col } from "react-bootstrap";
import { getAllVideos, getVideoById } from "../../fetching/videoFetchig";
import styles from "../../styles/sidebarVideo.module.css";
import SidebarVideo from "../../components/util/videos/sidebar-video";
import Subscribe from "../../components/util/videos/subscribe";

//===========================================
const VideoByID = (props) => {
  //--------------------
  const { selectedVideo, allVideos } = props;

  if (!selectedVideo) {
    return <>loading...</>;
  }
  return (
    <>
      <Container fluid>
        <Row className="text-center">
          <Col lg={9} className="bg-green">
            <video
              className={styles.videoPlayer}
              controls
              src={`/uploads/videos/${selectedVideo.fileName}`}
            ></video>
            <Subscribe />
          </Col>
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
  const { videos } = await getAllVideos();
  const videoByID = await videos.find((video) => video._id == videoId);

  return {
    props: { allVideos: videos, selectedVideo: videoByID },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { v_id: "63bd170ce45044549a172092" } }],
    fallback: true,
  };
}
