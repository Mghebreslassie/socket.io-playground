import { useEffect, useState } from "react";

const Chat = ({ socket, username, roomID }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  socket.on("recieve_message", (data) => {
    setAllMessages(data);
  });
  const sendMessage = async () => {
    if (currentMessage) {
      let messageData = {
        roomID,
        author: username,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      };
      await socket.emit("send_message", messageData);
      setAllMessages((prev) => [...prev, messageData]);
    }
  };
  useEffect(() => {}, [socket]);
  return (
    <div>
      <div className="chat-header">
        <p>live chat</p>
      </div>
      <div className="chat-body">
        {allMessages.map((message) => {
          return (
            <div
              key={`${message.author}${message.time}`}
              style={{
                width: "30%",
                border: "1px solid #6f6969",
                borderRadius: "10px",
                boxShadow: "0.3rem 0.3rem 0.5rem #b5b5b5",
                margin: "1%",
                padding: "0.25% 1%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ fontWeight: "700" }}>{message.author}: </p>:
                <p>{message.message}</p>
              </div>
              <span style={{ textAlign: "left" }}>{message.time}</span>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="message"
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
};

export default Chat;
