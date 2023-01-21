import { useEffect, useRef, useState } from "react";
import {
  subscribeCounter,
  isSubscribe,
  subscribe,
  unSubscribe,
} from "../../../fetching/subscribe";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { useSelector } from "react-redux";

//===============================================
const Subscribe = (props) => {
  //----------initional datat and state----------
  const userTo = props.userTo._id;
  const userFrom = props.userFrom;

  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const isLoggined = useSelector((state) => state.user.isLoggined);
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
  });

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

  //---------------------------------
  if (!isLoggined)
    return (
      <>
        <Overlay target={target.current} show={show} placement="right">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              لطفا ابتدار وارد وارد شوید
            </Tooltip>
          )}
        </Overlay>
        <Button
          onClick={() => setShow(!show)}
          ref={target}
          style={{
            fontSize: "1rem",
            fontWeight: "500",
            background: "#CC0000",
            padding: "5px 8px ",
            border: " #CC0000",
            borderRadius: "5px  ",
            color: "#AAAAAA",
          }}
        >
          {subscribeNumber} SUBSCRIBE
        </Button>
      </>
    );
  //---------------------------------
  return (
    <>
      <Button
        onClick={onSubscribe}
        style={{
          fontSize: "1rem",
          fontWeight: "500",
          background: `${isSubscribed ? "#AAAAAA" : "#CC0000"}`,
          padding: "5px 8px ",
          border: `${
            isSubscribed ? "1px solid  #CC0000" : "1px solid  #AAAAAA"
          }`,
          borderRadius: "5px  ",
          color: `${isSubscribed ? "#CC0000" : "#AAAAAA"}`,
        }}
      >
        {subscribeNumber} {isSubscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
      </Button>
    </>
  );
};

export default Subscribe;
