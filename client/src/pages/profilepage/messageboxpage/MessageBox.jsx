import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProfileMiddleComp from "../../../components/profilepage/ProfileMiddleComp";
import Message from "../../../components/profilepage/Message";
import { ThemeContext } from "../../../context/ThemeContext";
import { AuthContext } from "../../../context/AuthContext";
import "./MessageBox.css";

export default function MessageBox() {
  const themeContext = useContext(ThemeContext);
  const { userData } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const userId = userData._id;
        if (userId) {
          const response = await axios.get(
            `http://localhost:8000/api/challengesRequest/getMessagesForUser/${userId}`
          );
          console.log(response.data);
          setMessages(response.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [userData]);

  return (
    <ProfileMiddleComp>
      <div className={`MessageBoxContainer ${themeContext.theme}`}>
        <div className={`EditProfileHeading ${themeContext.theme}`}>
          <h1 style={{ margin: "0" }}>Inbox</h1>
        </div>
        <div className={`Messages`}>
          {messages
            .slice()
            .reverse()
            .map((msg) => (
              <Message
                key={msg._id}
                sender={msg.sender}
                senderid={msg.sender_id}
                receiver={msg.receiver}
                receiverid={msg.receiver_id}
                challenge={msg.ch_name}
                // challengeid={msg.ch_id}
              />
            ))}
        </div>
      </div>
    </ProfileMiddleComp>
  );
}

// import React, { useContext } from "react";
// import ProfileMiddleComp from "../../../components/profilepage/ProfileMiddleComp";
// import Message from "../../../components/profilepage/Message";
// import { ThemeContext } from "../../../context/ThemeContext";
// import "./MessageBox.css";

// export default function MessageBox() {
//   const themeContext = useContext(ThemeContext);
//   const messages = [
//     {
//       sender: { name: "Kashish Jain", id: "s129322345" },
//       receiver: { name: "Jaymin Dave", id: "s120212345" },
//       challenge: { name: "5 Day Serenity Challenge", credit: 100 },
//     },
//   ];

//   return (
//     <ProfileMiddleComp>
//       <div className={`MessageBoxContainer ${themeContext.theme}`}>
//         <div className={`EditProfileHeading ${themeContext.theme}`}>
//           <h1 style={{ margin: "0" }}>Inbox</h1>
//         </div>
//         <div className={`Messages`}>
//           {messages.map((msg, index) => (
//             <Message
//               key={index}
//               sender={msg.sender}
//               receiver={msg.receiver}
//               challenge={msg.challenge}
//             />
//           ))}
//         </div>
//       </div>
//     </ProfileMiddleComp>
//   );
// }
