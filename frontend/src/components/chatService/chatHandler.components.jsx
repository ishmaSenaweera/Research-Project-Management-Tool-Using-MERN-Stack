import "./chat.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./chat.components";

const socket = io.connect("http://localhost:5000");

function ChatHandler() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    // if (username !== "" && room !== "") {
    socket.emit("join_room", room);
    setShowChat(true);
    // }
  };

  useEffect(() => {
    joinRoom();
  }, []);

  return (
    <div className="App">
      {/* {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : ( */}
      <Chat socket={socket} username={"username"} room="test" />
      {/* )} */}
    </div>
  );
}

export default ChatHandler;
