import { useState } from "react";

function FileUploadScreen() {
  const [submissionType, setSubmissionType] = useState("singleFile");

  return (
    <div className="container">
      <h1 className="text-center mt-3">Upload Templates</h1>
      <div className="card p-4 mt-4">
        <div className="row text-center mt-5">
          <div className="col align-items-center">
            <div className="form-check form-check-inline align-items-center">
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
          <div className="row align-self-center justify-content-center mt-5">
            {submissionType === "singleFile" ? (
              <div className="row justify-content-center">
                <div className="col-4 ">
                  <label className="form-label">Single Template</label>
                  <input
                    className="form-control form-control-lg"
                    id="formFileLg"
                    type="file"
                  />
                </div>
                <div className="mt-4">
                  <button className="btn btn-secondary" type="button">
                    Upload
                  </button>
                </div>
              </div>
            ) : (
              <div className="row col-10 justify-content-center">
                <div className="col-4">
                  <label className="form-label">Title</label>
                  <input
                    type="txt"
                    className="form-control form-control-lg"
                    id="exampleFormControlInput1"
                    placeholder="Template Title"
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Multiple Templates</label>
                  <input
                    className="form-control form-control-lg"
                    id="formFileLg"
                    type="file"
                  />
                </div>
                <div className="mt-4">
                  <button className="btn btn-secondary" type="button">
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUploadScreen;
