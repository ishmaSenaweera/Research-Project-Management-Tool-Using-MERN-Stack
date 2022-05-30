import "./chat.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./chat.components";
import axios from "axios";

const socket = io.connect("http://localhost:8000");

function ChatHandler() {
  const [username, setUsername] = useState("isha");
  const [room, setRoom] = useState("123");
  const [showChat, setShowChat] = useState(false);
  const [userData, setUserData] = useState("");

  const joinRoom = () => {
    socket.emit("join_room", room);
    setShowChat(true);
  };

  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/account/");

      setUserData(result.data);
      joinRoom();
    } catch (err) {
      //await getLoggedIn();
      console.log(err);
    }
  }
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {showChat ? (
        <Chat socket={socket} username={userData.name} room={room} />
      ) : (
        <h1>Connecting...</h1>
      )}
    </div>
  );
}

export default ChatHandler;
