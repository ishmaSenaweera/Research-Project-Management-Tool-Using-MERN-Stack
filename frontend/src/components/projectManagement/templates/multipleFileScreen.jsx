import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../userManagement/context/LoginContext";

function MultipleFileScreen() {
  const { loggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    async function getMultipleFileData() {
      try {
        await axios
          .get("http://localhost:8000/api/getAllMultipleFiles/")
          .then((res) => {
            if (res.status === 200) {
              setDataList(res.data);
              console.log(dataList);
            }
            setLoading(false);
          });
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    getMultipleFileData();
  }, []);

  async function deleteMultipleTemplates(details) {
    try {
      if (window.confirm("This File Will Be Deleted!")) {
        await axios
          .delete(
            `http://localhost:8000/api/multipleFiles/delete/${details._id}`
          )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              alert(res.data);
              window.location.reload();
            }
          });
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

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
      if (loggedIn === "Staff" || loggedIn === "Admin") {
        return (
          <tr key={item._id}>
            <td>{item.title}</td>
            <td>
              {item.files.map((file, index) => (
                <div className="col-10" key={index}>
                  <a
                    href={`http://localhost:8000/${file.filePath}`}
                    download={``}
                  >
                    {file.fileName}
                  </a>
                </div>
              ))}
            </td>
            <td>{item.fileMessage}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={deleteMultipleTemplates.bind(this, item)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      }
      if (item.fileVisibility === "Both" && loggedIn === "Student") {
        return (
          <tr key={item._id}>
            <td>{item.title}</td>
            <td>
              {item.files.map((file, index) => (
                <div className="col-10" key={index}>
                  <a
                    href={`http://localhost:8000/${file.filePath}`}
                    download={``}
                  >
                    {file.fileName}
                  </a>
                </div>
              ))}
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

export default MultipleFileScreen;
