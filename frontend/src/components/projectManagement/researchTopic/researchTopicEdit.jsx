import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResearchTopicEdit() {
  const { state } = useLocation();
  const [groupId, setGroupId] = useState(state.groupId.gid);
  const [researchTopic, setResearchTopic] = useState(state.researchTopic);
  const [status, setStatus] = useState(state.status);
  const [feedBack, setFeedBack] = useState(state.feedBack);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      await axios.get("http://localhost:8000/chat/find-group").then((res) => {     
        setGroupId(res.data.gid);
      });
    }
    getData();
  }, []);

  const editResearchTopic = async () => {
    try {
      data = {
        researchTopic: researchTopic,
        status: status,
        feedBack: feedBack,
      };    
      await axios
        .put(`http://localhost:8000/research-topic/update/${state._id}`, data)
        .then((res) => {       
          if (res.status === 200) {         
            alert(res.data);
            navigate("/researchTopic/view")
          }
        });
    } catch (error) {
        console.error(error)
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card mt-5">
          <div className="card-header">
            <h3>Edit Research Topic</h3>
          </div>
          <div className="card-body">
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Group Id</label>
              <div className="col-sm-5">
                <input
                  type="text"
                  disabled
                  class="form-control"
                  value={groupId}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Topic</label>
              <div className="col-sm-5">
                <input
                  type="text"
                  class="form-control"
                  disabled
                  value={researchTopic}
                  onChange={(e) => {
                    setResearchTopic(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Status</label>
              <div className="col-sm-5">
                <select
                  name="status"
                  id="statusType"
                  style={{
                    width: "260px",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">FeedBack</label>
              <div className="col-sm-5">
                <textarea
                  rows="5"
                  class="form-control"
                  value={feedBack}
                  onChange={(e) => {
                    setFeedBack(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="m-auto mb-3">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => editResearchTopic()}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchTopicEdit;
