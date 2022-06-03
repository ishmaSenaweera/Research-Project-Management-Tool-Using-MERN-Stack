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
      return (
        <tr key={item._id}>
          {isHidden === false && (
            <>
              <td>{item.title}</td>
              <td>
                
                    {item.files.map((file, index) =>
                        <div className="col-10" key={index}>
                            <a
                                href={`http://localhost:8000/${file.filePath}`}
                                download={``}
                            >
                                {file.fileName}
                            </a>
                        </div>
                    )}
               
              </td>
              {loggedIn === "Staff" ? (
                <>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        onChange={() => hideRow(this, index)}
                      />
                      <label className="form-check-label">Hide</label>
                    </div>
                  </td>
                  <td>Delete</td>{" "}
                </>
              ) : (
                ""
              )}
            </>
          )}
        </tr>
      );
    });
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>Template Structures Documents</h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <tbody>{fileList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MultipleFileScreen;
