import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Container, Row, Col } from "react-bootstrap";
import VideoCard from "../components/util/videos/videoCard";
import { getAllVideos } from "../fetching/videoFetchig";

//==========================================================
export default function Home(props) {
  //----------initional data and states----------
  const { videos } = props.loadedVideos;

  if (!videos) {
    return <>loading</>;
  }

  return (
    <>
      <Head>
        <title>Orange Tube</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid>
        <Row className="pt-2 justify-content-center ">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              writer={video.writer.userName}
              userImage={video.writer.avatarPath}
              title={video.title}
              description={video.description}
              thumbnail={video.thumbnail}
              duration={video.duration}
              videoId={video._id}
            />
          ))}

          <footer className={styles.footer}></footer>
        </Row>
      </Container>
    </>
  );
}

//=======================server side=======================

export async function getStaticProps() {
  const videos = await getAllVideos();
  return {
    props: { loadedVideos: videos },
    revalidate: 2,
  };
}
