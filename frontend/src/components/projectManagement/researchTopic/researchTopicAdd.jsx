import axios from "axios";
import { useEffect, useState } from "react";

function ResearchTopicAdd() {
  const [groupId, setGroupId] = useState("");
  const [researchTopic, setResearchTopic] = useState("");
  const [status, setStatus] = useState("");
  const [feedBack, setFeedBack] = useState("");
  const [group, setGroup] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    try {
      async function getData() {
        await axios.get("http://localhost:8000/chat/find-group").then((res) => {
          setGroup(res.data);
          setGroupId(res.data.gid);
          axios
            .get(`http://localhost:8000/research-topic/details/${res.data._id}`)
            .then((res) => {
              setDetails(res.data);
              console.log(res.data);
              setResearchTopic(res.data.researchTopic);
              setStatus(res.data.status);
              setFeedBack(res.data.feedBack);
            });
        });
      }
      getData();
    } catch (error) {}
  }, []);

  const saveResearchTopic = async () => {
    if (status === "Rejected") {
      try {
        data = {
          researchTopic: researchTopic,
          status: "Pending",
          feedBack: feedBack,
        };
        await axios
          .put(`http://localhost:8000/research-topic/update/${details._id}`, data)
          .then((res) => {
            if (res.status === 200) {
              alert(res.data);
              window.location.reload();
            }
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        data = {
          groupId: group._id,
          researchTopic: researchTopic,
          status: status,
          feedBack: feedBack,
        };
        await axios
          .post("http://localhost:8000/research-topic/save", data)
          .then((res) => {
            if (res.status === 200) {
              alert(res.data);
              window.location.reload();
            }
          });
      } catch (error) {
        console.error(error);
        alert(error.response.data);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card mt-5">
          <div className="card-header">
            <h3>Topic Submission</h3>
          </div>
          <div className="card-body">
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Group Id</label>
              <div className="col-sm-5">
                <input
                  type="text"
                  disabled
                  className="form-control"
                  value={groupId}
                />
              </div>
            </div>
            {status === "Rejected" || status === "" ? (
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Topic</label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    value={researchTopic}
                    onChange={(e) => {
                      setResearchTopic(e.target.value);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Topic</label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    value={researchTopic}
                    disabled
                    onChange={(e) => {
                      setResearchTopic(e.target.value);
                    }}
                  />
                </div>
              </div>
            )}

            {details ? (
              <>
                <div className="mb-3 row">
                  <label className="col-sm-2 col-form-label">Status</label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      name="status"
                      list="statusType"
                      className="form-control"
                      disabled
                      value={status}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-2 col-form-label">FeedBack</label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      name="status"
                      list="statusType"
                      className="form-control"
                      disabled
                      value={feedBack}
                    />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>

          {status === "Rejected" || status === "" ? (
            <div className="m-auto mb-3">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => saveResearchTopic()}
              >
                Submit
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default ResearchTopicAdd;
