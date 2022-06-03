import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResearchTopicView() {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllData() {
      try {
        await axios.get("http://localhost:8000/research-topic/").then((res) => {
          if (res.status === 200) {
            setDetails(res.data.details);           
          }
        });
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    getAllData();
  }, []);

  function editResearchTopicStatus(details){
    navigate("/researchTopic/edit", { state: details });
  }

  dataList = details.map((item, index) => {  
    return (
      <tr key={index}>
        <td>{item.groupId.gid}</td>
        <td>{item.researchTopic}</td>
        <td>{item.status}</td>
        <td>{item.feedBack}</td>
        <td>
          <button className="btn btn-success" onClick={editResearchTopicStatus.bind(this,item)}>Edit</button>
        </td>        
      </tr>
    );
  });

  return (
    <div className="container px-4">
      <div className="card mt-5">
        <div className="card-header">
          <h3>Research Topic Submissions</h3>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <td>Group Id</td>
                <td>Research topic</td>
                <td>Status</td>
                <td>FeedBack</td>
              </tr>
            </thead>
            <tbody>{dataList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResearchTopicView;
