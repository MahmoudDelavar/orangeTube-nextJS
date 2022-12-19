import Link from "next/link";
import styles from "../../../styles/link.module.css";

//=============================
const customLink = ({ children, href }) => {
  return (
    <>
      <Link legacyBehavior href={href}>
        <a id="link" className={styles.link}>
          {children}
        </a>
      </Link>
    </>
  );
};

export default customLink;
