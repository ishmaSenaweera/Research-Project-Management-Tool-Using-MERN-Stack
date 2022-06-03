import "./chat.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./chat.components";
import axios from "axios";
import { Table } from "react-bootstrap";

const socket = io.connect("http://localhost:8000");

function ChatHandler() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/account/");
      const group = await axios.get("http://localhost:8000/chat/find-group");

      setUsername(result.data.name);
      setRoom(group.data.gid);
    } catch (err) {
      alert("Error! Group not found!");
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {!showChat ? (
        <div className="list">
          <div className="list-sub-table">
            <div className="head">
              <h1>Chat List</h1>
            </div>
            <hr />
            <Table className="table table-hover">
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{room}</td>
                  {room && (
                    <td>
                      <button
                        className="btn btn-primary account-button-blue"
                        onClick={joinRoom}
                      >
                        Join
                      </button>
                    </td>
                  )}
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ChatHandler;
