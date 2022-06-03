import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/LoginContext";

function SingleFileScreen() {
  const { loggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [isHidden, setIsHidden] = useState(false);

  function hideRow(data) {   
    setIsHidden(true);
  }

  useEffect(() => {
    async function getSingleFileData() {
      try {
        await axios
          .get("http://localhost:8000/api/getAllSingleFiles/")
          .then((res) => {
            if (res.status === 200) {
              setDataList(res.data);
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
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    fileList = dataList.map((item, index) => {
      return (
        <tr key={index}>
          {isHidden === false && (
            <>
              <td>
                <a
                  href={`http://localhost:8000/${item.filePath}`}
                  download={``}
                >
                  {item.fileName}
                </a>
              </td>
              <td>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"                            
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onChange={() => hideRow(this, index)}
                  />
                  <label className="form-check-label">
                    Hide
                  </label>
                </div>
              </td>
              <td>
               Delete
              </td>
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

export default SingleFileScreen;
