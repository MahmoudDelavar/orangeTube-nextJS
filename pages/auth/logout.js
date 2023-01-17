import { useEffect } from "react";
//========================================
const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    setTimeout(() => {
      window.location = "/";
    }, 2000);
  });

  return <></>;
};

export default Logout;
