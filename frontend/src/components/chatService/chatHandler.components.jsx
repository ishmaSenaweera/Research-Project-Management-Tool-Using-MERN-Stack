import "./chat.css";
import io from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import Chat from "./chat.components";
import axios from "axios";
import { Table } from "react-bootstrap";
import AuthContext from "../userManagement/context/LoginContext";

const socket = io.connect("http://localhost:8000");

function ChatHandler() {
  const { loggedIn } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [group, setGroup] = useState([]);
  const [showChat, setShowChat] = useState(false);

  /**
   * When the user clicks on a button, the function will set the room state to the value of the button's
   * id, and if the username and room states are not empty, it will emit a join_room event to the server,
   * and set the showChat state to true.
   */
  const joinRoom = (gid) => {
    setRoom(gid);
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  /**
   * It gets the username and group from the database and sets the state of the username and group.
   */
  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/account/");
      if (loggedIn === "Student") {
        const group = await axios.get("http://localhost:8000/chat/find-group");
        setGroup(group.data.allgroups);
      } else {
        const group = await axios.get("http://localhost:8000/groups/");
        setGroup(group.data.allgroups);
      }
      setUsername(result.data.name);
    } catch (err) {
      alert("Error! Group not found!");
      console.log(err);
    }
  }

  /**
   * It returns a table row for each group in the group array.
   * @returns A list of table rows.
   */
  function groupList() {
    return group.map((current, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{current.gid}</td>
          <td>
            <button
              className="btn btn-primary account-button-blue"
              onClick={joinRoom.bind(this, current.gid)}
            >
              Join
            </button>
          </td>
        </tr>
      );
    });
  }

  /* Calling the getData function when the component is mounted. */
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {!showChat ? (
        <div className="list">
          <div className="list-sub-table">
            <div className="head">
              <h1>Chat Groups</h1>
            </div>
            <hr />
            <Table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{groupList()}</tbody>
            </Table>
          </div>
        </div>
      ) : (
        /* Rendering the Chat component. */
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ChatHandler;
