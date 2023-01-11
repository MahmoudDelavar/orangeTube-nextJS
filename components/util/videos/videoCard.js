import Image from "next/image";
import { Col } from "react-bootstrap";
import styles from "../../../styles/videoCard.module.css";
//============================================
const VideoCard = ({
  writer,
  title,
  description,
  thumbnail,
  duration,
  userImage,
}) => {
  return (
    <>
      <Col className={styles.cardBox}>
        <Image
          className={styles.thumbnail}
          src={thumbnail}
          width={600}
          height={400}
          alt="faild-thumbnail"
        />

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
        <span className={styles.duration}>{duration}</span>
      </Col>
    </>
  );
};

export default VideoCard;
