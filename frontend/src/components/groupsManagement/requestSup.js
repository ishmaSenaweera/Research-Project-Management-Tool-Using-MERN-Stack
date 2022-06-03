import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ReqSupervisor() {
    const [supervisors, setSupervisors] = useState([]);
    const [supervisorId, setSupervisorId] = useState(0)
    const [groupId, setGroupId] = useState(0)

    useEffect(() => {
        axios.get("http://localhost:8000/groups/supervisor")
            .then(res => {
                setSupervisors(res.data.staff);
            }
            ).catch(err => {
                console.log(err);
            }
            );
    }
    , []);

    return (
        <div className="main">
        <div className="sub-main">
        <div>
          <div>
            <h1>Request Supervisor</h1>
            
        <form>
            <div class="form-group">
                <label for="text1">Select Supervisor</label><hr/>
                    {/* create a  dropdown menu for the supervisor id and name */}
                <select class="form-input" onChange={(e) => setSupervisorId(e.target.value)}>
                    <option value="0">Select Supervisor</option>

                    {supervisors.map(supervisor => (
                        <option key={supervisor.id} value={supervisor.id}> {`${supervisor.name}`}</option>
                    ))}
                </select>
                

            </div>
            <hr/>
            <div class="form-group">
                <label for="text2">Group ID</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="G-12SGHD"
                    onChange={(e) => setGroupId(e.target.value)}
                   
                />
            </div>




            <div className="login-button">
                <button
                type="button"
                class="button"
                onClick={() => {
                    axios.post("http://localhost:8000/groups/supervisor/request/topic", {
                        supervisorid: supervisorId,
                        groupid: groupId
                    }).then(res => {
                        console.log(res);
                        alert("Request sent successfully!");
                    }
                    ).catch(err => {
                        console.log(err);
                    }
                    );
                }
                }
                
                
                >
                Request
            </button>
            </div>
        </form>
        </div>
        </div>
        </div>
        </div>
    );
}
