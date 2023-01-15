import { useEffect, useState } from "react";
import {
  subscribeCounter,
  isSubscribe,
  subscribe,
  unSubscribe,
} from "../../../fetching/subscribe";

//===============================================
const Subscribe = (props) => {
  //----------initional datat and state----------
  const userTo = props.userTo._id;
  const userFrom = props.userFrom;

  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  //----------handle onSubscribe btn----------
  const onSubscribe = () => {
    if (isSubscribed) {
      //----when already subscribed----
      unSubscribe({ userTo, userFrom })
        .then((message) => {
          setSubscribeNumber(subscribeNumber - 1);
          setIsSubscribed(!isSubscribed);
        })
        .catch((err) => console.log("subscribe ERR", err));
    } else {
      //----when we are not subscribtion yet----
      subscribe({ userTo, userFrom })
        .then((message) => {
          setSubscribeNumber(subscribeNumber + 1);
          setIsSubscribed(!isSubscribed);
        })
        .catch((err) => console.log("subscribe ERR", err));
    }
  };
  //----------------------------------------------
  useEffect(() => {
    // ---calculate the number of subscribtions---
    subscribeCounter(userTo)
      .then((count) => {
        setSubscribeNumber(count);
      })
      .catch((err) => console.log("subscribeCounter ERR:", err));

    // ---Check subscribed or not---
    isSubscribe({ userTo, userFrom })
      .then((isSubscribe) => {
        setIsSubscribed(isSubscribe);
      })
      .catch((err) => console.log("isSubscribe ERR", err));
  }, []);

  return (
    <>
      <button
        onClick={onSubscribe}
        style={{
          fontSize: "1.2rem",
          fontWeight: "500",
          background: `${isSubscribed ? "#AAAAAA" : "#CC0000"}`,
          padding: "8px 10px ",
          border: `${
            isSubscribed ? "1px solid  #CC0000" : "1px solid  #AAAAAA"
          }`,
          borderRadius: "5px  ",
          color: `${isSubscribed ? "#CC0000" : "#AAAAAA"}`,
        }}
      >
        {subscribeNumber} {isSubscribed ? "subscribed" : "subscribe"}
      </button>
    </>
  );
};

export default Subscribe;
