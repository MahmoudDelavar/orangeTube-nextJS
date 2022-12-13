import { Form } from "react-bootstrap";
import styles from "../../../styles/register.module.css";
import { AiFillPicture, AiFillPlusSquare } from "react-icons/ai";

//==================================================
const AvatarInput = (loadAvatar) => {
  return (
    <>
      <Form.Label htmlFor="avatar">
        <AiFillPlusSquare size={100} />
        <br />
        <Form.Text>تصویر</Form.Text>
      </Form.Label>
      <Form.Control
        onChange={loadAvatar}
        id="avatar"
        type="file"
        className={styles.avatarInput}
      />
    </>
  );
};

export default AvatarInput;
