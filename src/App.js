import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("https://socket-react-basic.herokuapp.com/");

function App() {
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");
  const joinRoom = () => {
    if (username && roomID) {
      socket.emit("join_room", { username, roomID });
    }
  };
  return (
    <div className="App">
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="roomID"
        value={roomID}
        onChange={(e) => setRoomID(e.target.value)}
      />
      <button onClick={joinRoom}>Join</button>
      <Chat socket={socket} username={username} roomID={roomID} />
    </div>
  );
}

export default App;
