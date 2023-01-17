import { useSelector } from "react-redux";
import { getSubscribtionVideos } from "../../fetching/videoFetchig";
import VideoCard from "../../components/util/videos/videoCard";
import { useEffect, useState } from "react";
import Link from "../../components/util/views/costumLink";

//==================================================
const SubscribtionPage = () => {
  const [videos, setVideos] = useState([]);
  const isLoggined = useSelector((state) => state.user.isLoggined);

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    getSubscribtionVideos(userID)
      .then((videos) => {
        setVideos(videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!isLoggined) {
    return (
      <>
        ابتدا به حساب کاربری خود <Link href={"/auth/login"}>وارد</Link> شوید
      </>
    );
  }
  if (!videos) {
    return <>loading....</>;
  }
  if (videos.length === 0) {
    return <>شما هیچ اشتراکی ندارید</>;
  }
  return (
    <>
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
    </>
  );
};

export default SubscribtionPage;
