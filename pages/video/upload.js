import { useState } from "react";
import {
  Row,
  Col,
  Form,
  FormSelect,
  InputGroup,
  Button,
} from "react-bootstrap";
import FormInput from "../../components/util/inputs/form-input";
import { AiOutlineVideoCameraAdd, AiFillPicture } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import { fetchUrl } from "../../next.config";
import Image from "next/image";
import Link from "../../components/util/views/costumLink";
import AuthAlerts from "../../components/util/views/auth-alerts";
import * as yup from "yup";
//===========================================
const Upload = () => {
  //--------------states and initial variables--------------
  const [isLoading, setIsLoading] = useState(false);
  const [videoPath, setVideoPath] = useState("");
  const [videoName, setVideoName] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [validationErr, setValidationErr] = useState([]);

  const user = useSelector((state) => state.user.userInfo);

  //------------load video and gnerate thumbnail------------
  const loadVideo = async (e) => {
    e.preventDefault();
    const form = new FormData();
    const config = {
      header: {
        "content-type": "multipart-data",
      },
    };
    form.append("file", e.target.files[0]);
    let url = `${fetchUrl}/api/video/upload`;
    axios
      .post(url, form, config)
      .then((res) => {
        setVideoPath(res.data.data.filePath);
        setVideoName(res.data.data.fileName);

        let variable = {
          filePath: res.data.data.filePath,
          fileName: res.data.data.fileName,
        };

        //generate thumbnail  thumbnailFilePath, fileDuration

        let url = `${fetchUrl}/api/video/thumbnail`;
        axios
          .post(url, variable)
          .then((res) => {
            setThumbnail(res.data.data.thumbFliePath);
            setDuration(res.data.data.fileDuration);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  //-------validation video info (fom inputs)-------
  let schema = yup.object().shape({
    title: yup.string().required("عتوان ویدئو را وارد کنید "),
    description: yup.string().required("توضیح مختصری درباره ویدئو بنویسید"),
    thumbnail: yup.string().required("هیچ ویدئویی بارگزاری نکرده اید "),
  });

  const validate = async (videoInfo) => {
    try {
      const result = await schema.validate(videoInfo, { abortEarly: false });
      setValidationErr([]);
      return result;
    } catch (err) {
      setValidationErr(err.errors);
    }
  };
  //-----------Handle submit Form (save video)-----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const writer = user.userName;
    const title = form.get("title");
    const description = form.get("description");
    const category = form.get("category");

    const videoInfo = {
      writer: user.id,
      title,
      description,
      category,
      path: videoPath,
      duration,
      thumbnail,
      fileName: videoName,
    };

    let url = `${fetchUrl}/api/video/addVideo`;

    const result = await validate(videoInfo);
    if (result) {
      axios
        .post(url, videoInfo)
        .then((res) => {
          setSuccessMsg(res.data.message);
          setTimeout(() => {
            window.location = "/video/upload";
          }, 2000);
        })
        .catch((err) => console.log(err));
    }
  };

  //-------redirect to Login page (if....)-------
  if (!user.userName) {
    return (
      <>
        برای بارگذاری ویدئو ، ابتدا به حساب کاربری خود{" "}
        <Link href={"/auth/login"}>وارد</Link> شوید
      </>
    );
  }

  return (
    <>
      <Row>
        {/* --------------alert box-------------- */}
        <AuthAlerts successMsg={successMsg} validationErr={validationErr} />

        <Col xxl={6} xl={8} lg={10} md={11} className="formBox">
          <Form onSubmit={handleSubmit}>
            <FormInput type="text" name="title" text="عنوان" />
            <FormInput type="textArea" name="description" text="توضیحات" />
            <InputGroup>
              <InputGroup.Text htmlFor="category">دسته بندی</InputGroup.Text>
              <Form.Select name="category" id="category">
                <option value={"انیمیشن"}>انیمیشن</option>
                <option value={"موزیک"}>موزیک</option>
                <option value={"آموزشی"}>آموزشی</option>
                <option value={"سرگرمی"}>سرگرمی</option>
                <option value={"ورزشی"}>ورزشی</option>
              </Form.Select>
            </InputGroup>
            <Row className="align-items-center text-center">
              <Col>
                <Form.Label htmlFor="video" style={{ cursor: "pointer" }}>
                  <AiOutlineVideoCameraAdd size={100} />
                  <br />
                  <Form.Text>بارگذاری ویدئو</Form.Text>
                </Form.Label>
                <Form.Control
                  onChange={(e) => loadVideo(e)}
                  id="video"
                  type="file"
                  className="fileInput"
                />
              </Col>

              <Col>
                {thumbnail !== "" && (
                  <Image
                    src={thumbnail}
                    width={100}
                    height={100}
                    alt="faild loading"
                  />
                )}
                {videoPath == "" &&
                  (isLoading ? (
                    <Spinner animation="border" variant="info" />
                  ) : (
                    <>
                      <AiFillPicture size={100} /> <p>پیش نمایش</p>
                    </>
                  ))}
              </Col>
            </Row>{" "}
            <div className="d-grid">
              <Button type="submit"> ارسال</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Upload;
