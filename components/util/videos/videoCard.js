import Image from "next/image";
import { Col } from "react-bootstrap";
import styles from "../../../styles/videoCard.module.css";
import Link from "../views/costumLink";

//============================================

const VideoCard = ({
  writer,
  title,
  description,
  thumbnail,
  duration,
  userImage,
  videoId,
}) => {
  //-----convert video duration to min:second-----
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);

  return (
    <>
      <Col>
        <div className={styles.cardBox}>
          <span className={styles.duration}>{`${minutes}:${seconds}`}</span>

          <Link href={`/video/${videoId}`}>
            <Image
              className={styles.thumbnail}
              src={thumbnail}
              width={600}
              height={400}
              alt="faild-thumbnail"
            />
          </Link>
          <br />
          <Image
            className={styles.userImage}
            src={userImage}
            width={300}
            height={300}
            alt="faild-avatar"
          />
          <span className={styles.Writer}>{writer}</span>

          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </Col>
    </>
  );
};

export default VideoCard;
