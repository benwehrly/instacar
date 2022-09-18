import "./style.css";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const Chat = () => {
  const [hovered, setHovered] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const boxRef = useRef(null);

  function displayChatBox() {
    setShowChatBox(!showChatBox);
  }

  useEffect(() => {
    if (showChatBox) {
      boxRef.current.style.transform = "scale(1)";
    } else {
      boxRef.current.style.transform = "scale(.1)";
    }
  }, [showChatBox]);

  return (
    <div className="container">
      <div
        ref={boxRef}
        className="chat-box"
        style={{ visibility: !showChatBox && "hidden" }}
      >
        <h3>How can we help?</h3>
        <div className='messages'>All Team Member are currently busy.</div>

        <div className="chat-inputs">
          <textarea placeholder="Ask us anything!"></textarea>
          <button className="submit-button">Send Msg</button>
        </div>
      </div>
      <motion.button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="chat-button"
        animate={{ y: hovered ? -5 : -10 }}
        transition={{
          repeat: Infinity,
          duration: hovered ? 0.2 : 0.5,
          repeatType: "reverse",
        }}
        onClick={displayChatBox}
      >
        <p>Chat</p>
      </motion.button>
    </div>
  );
};

export default Chat;
