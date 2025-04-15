import React from "react";
import "./Message.css";
import { toast } from "react-hot-toast";

export default function Message({ sender, challenge }) {
  function handleAccept() {
    toast.success(`Challenge With Meditator FOR ${challenge} Started !`, {
      duration: 3000,
      position: "top-center",
      style: {
        backgroundColor: "#333",
        color: "white",
      },
    });
  }
  function handleReject() {
    toast.error(`Request FOR ${challenge} is Declined !`, {
      duration: 3000,
      position: "top-center",
      style: {
        backgroundColor: "#333",
        color: "white",
      },
    });
  }

  return (
    <div className="Message">
      <div className="MessageText">
        <b>{sender}</b> requested you for <b>{challenge}</b>.
      </div>
      <div className="AcceptDeclineButtons">
        <button className="acceptbtn" onClick={handleAccept}>
          Accept
        </button>
        <button className="rejectbtn" onClick={handleReject}>
          Decline
        </button>
      </div>
    </div>
  );
}
