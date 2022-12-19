import styles from "../../../styles/banner.module.css";
//===============================================
const Banner = () => {
  return (
    <>
      <div className={styles.banner}>
        <video className={styles.video} autoPlay muted loop>
          <source src="./banner/banner.mp4" type="video/mp4" />
        </video>
        <h2 className={styles.text}>Enjoy Watching</h2>
      </div>
    </>
  );
};

export default Banner;
