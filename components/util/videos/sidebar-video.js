import Image from "next/image";
import { Col } from "react-bootstrap";
import styles from "../../../styles/sidebarVideo.module.css";
import Link from "../views/costumLink";
//-----------------------------------------------------------------
const SidebarVideo = ({ title, description, thumbnail, duration, videoId }) => {
  //-----convert video duration to min:second-----
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);

  return (
    <>
      <Col>
        <div className={styles.Box}>
          <div className={styles.thumbnailBox}>
            <Link href={`/video/${videoId}`}>
              <Image
                className={styles.thumbnail}
                src={thumbnail}
                width={600}
                height={400}
                alt="faild-thumbnail"
              />
            </Link>
          </div>

          <div className={styles.infoBox}>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
            <span className={styles.duration}>{`${minutes}:${seconds}`}</span>
          </div>
        </div>
      </Col>
    </>
  );
};

export default SidebarVideo;
