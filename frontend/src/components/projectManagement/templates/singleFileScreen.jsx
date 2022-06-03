import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../userManagement/context/LoginContext";

function SingleFileScreen() {
  const { loggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    async function getSingleFileData() {
      try {
        await axios
          .get("http://localhost:8000/api/getAllSingleFiles/")
          .then((res) => {
            if (res.status === 200) {
              setDataList(res.data);
              console.log(res.data);
            }
            setLoading(false);
          });
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    getSingleFileData();
  }, []);

  if (loading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    fileList = dataList.map((item, index) => {
      if (loggedIn === "Staff") {
        return (
          <tr key={index}>
            <td>{item.fileTopic}</td>
            <td>
              <a
                href={`http://localhost:8000/${item.filePath}`}
                download={``}
                style={{ textDecoration: "none" }}
              >
                {item.fileName}
              </a>
            </td>
            <td>{item.fileMessage}</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        );
      }
      if (item.fileVisibility === "Both" && loggedIn === "Student") {
        return (
          <tr key={index}>
            <td>{item.fileTopic}</td>
            <td>
              <a
                href={`http://localhost:8000/${item.filePath}`}
                download={``}
                style={{ textDecoration: "none" }}
              >
                {item.fileName}
              </a>
            </td>
            <td>{item.fileMessage}</td>
          </tr>
        );
      }
    });
  }

  return (
    <div className="container px-4">
      <table className="table table-bordered">
        <tbody>{fileList}</tbody>
      </table>
    </div>
  );
}

export default SingleFileScreen;
