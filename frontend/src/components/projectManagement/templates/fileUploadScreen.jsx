import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FileUploadScreen() {
  const [submissionType, setSubmissionType] = useState("singleFile");
  const [singleFile, setSingleFile] = useState("");
  const [multipleFile, setMultipleFile] = useState("");
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const singleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  const multipleFileChange = (e) => {
    setMultipleFile(e.target.files);
  };

  const uploadSingleFile = async () => {
    try {
      if (singleFile.length !== 0 && title !== "" && visibility !== "") {
        const formData = new FormData();
        formData.append("file", singleFile);
        formData.append("fileVisibility", visibility);
        formData.append("fileTopic", title);
        formData.append("fileMessage", message);
        await axios
          .post("http://localhost:8000/api/singleFile", formData)
          .then((res) => {
            alert(res.data);
            navigate("/templates/show");
          })
          .catch(() => alert("This File Format is Not Allowed!"));
      } else {
        alert("Missing Fields");
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const uploadMultipleFiles = async () => {
    try {
      if (multipleFile.length !== 0 && title !== "" && visibility !== "") {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("fileVisibility", visibility);
        formData.append("fileMessage", message);
        for (let i = 0; i < multipleFile.length; i++) {
          formData.append("files", multipleFile[i]);
        }
        await axios
          .post("http://localhost:8000/api/multipleFiles", formData)
          .then((res) => {
            {
              alert(res.data);
              navigate("/templates/show");
            }
          })
          .catch(() => alert("This File Format is Not Allowed!"));
      } else if (title === "" || visibility === "") {
        alert("Missing Fields");
      } else {
        alert("Please Select Files");
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-3">Upload Templates</h1>
      <div className="card p-4 mt-4 mb-5">
        <div className="col align-items-center justify-content-center">
          <div className="card-header">
            <div className="form-check form-check-inline align-items-center justify-content-center">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="singleFile"
                defaultChecked
                onChange={(event) => {
                  setSubmissionType(event.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Single File
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="multipleFiles"
                onChange={(event) => {
                  setSubmissionType(event.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Multiple Files
              </label>
            </div>
          </div>
        </div>
        <div className="row text-center mt-3">
          <div className="card-body">
            <div className="row mt-5">
              {submissionType === "singleFile" ? (
                <form>
                  <div className="row">
                    <div className="col-4">
                      <label className="form-label">Topic</label>
                      <input
                        className="form-control form-control-lg"
                        id="formFileLg"
                        type="text"
                        onChange={(event) => {
                          setTitle(event.target.value);
                        }}
                      />
                    </div>

                    <div className="col-4 ">
                      <label className="form-label">Single File Uploader</label>
                      <input
                        className="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        onChange={(event) => {
                          singleFileChange(event);
                        }}
                      />
                    </div>

                    <div className="col mt-3">
                      <div>
                        <label className="me-3">Visibility</label>
                      </div>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="Both"
                        onChange={(event) => {
                          setVisibility(event.target.value);
                        }}
                      />
                      <label
                        className="form-check-label me-2"
                        htmlFor="inlineRadio1"
                      >
                        Student
                      </label>

                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="Staff"
                        onChange={(event) => {
                          setVisibility(event.target.value);
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        Staff Only
                      </label>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="5"
                      onChange={(event) => {
                        setMessage(event.target.value);
                      }}
                    />
                  </div>

                  <div className="m-5">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => uploadSingleFile()}
                    >
                      Upload
                    </button>
                  </div>
                </form>
              ) : (
                <form>
                  <div className="row justify-content-center">
                    <div className="col-4">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="validationDefault01"
                        placeholder="Template Title"
                        required
                        onChange={(event) => {
                          setTitle(event.target.value);
                        }}
                      />
                    </div>

                    <div className="col-5">
                      <label className="form-label">
                        Multiple Files Uploader
                      </label>
                      <input
                        className="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        multiple
                        onChange={(event) => {
                          multipleFileChange(event);
                        }}
                      />
                    </div>

                    <div className="col mt-3">
                      <div>
                        <label className="me-3">Visibility</label>
                      </div>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="Both"
                        onChange={(event) => {
                          setVisibility(event.target.value);
                        }}
                      />
                      <label
                        className="form-check-label me-2"
                        htmlFor="inlineRadio1"
                      >
                        Student
                      </label>

                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="Staff"
                        onChange={(event) => {
                          setVisibility(event.target.value);
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        Staff Only
                      </label>
                    </div>
                  </div>

                  <div className="mt-5 mb-4">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="5"
                      onChange={(event) => {
                        setMessage(event.target.value);
                      }}
                    />
                  </div>

                  <div className="m-auto">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => uploadMultipleFiles()}
                    >
                      Upload
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUploadScreen;
