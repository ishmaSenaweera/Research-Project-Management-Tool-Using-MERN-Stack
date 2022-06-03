import React, { useState, useEffect } from "react";
import axios from "axios";
import "./group.css";

export default function AddGroup() {
    const [student1, setStudnet1] = useState("");
    const [student2, setStudnet2] = useState("");
    const [student3, setStudnet3] = useState("");
    const [student4, setStudnet4] = useState("");

    useEffect(() => {
        console.log("AddGroup");

    }, []);

    const handleSubmit = (e) => {

        const url = "http://localhost:8000/groups/";
        const data = {
            student1: student1,
            student2: student2,
            student3: student3,
            student4: student4,
        };

        axios.post(url, data).then(res => {
            console.log(res);
            console.log(res.data);
            alert("Group created successfully!");

            window.location.href = "/allGroups";

        }
        )
    };

    return (
        <div className="main">
        <div className="sub-main">
        <div>
          <div>
            <h1>Create Research Group</h1>
        <form>
            <div class="form-group">
                <label for="text1">Member 1 </label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Enter member 1 ID number"
                    value={student1}
                    onChange={e => setStudnet1(e.target.value)}
                />
            </div>

            <div class="form-group">
                <label for="text2">Member 2</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Enter member 2 ID number"
                    value={student2}
                    onChange={e => setStudnet2(e.target.value)}
                />
            </div>

            <div class="form-group">
                <label for="text3">Member 3</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Enter member 3 ID number"
                    value={student3}
                    onChange={e => setStudnet3(e.target.value)}
                />
            </div>

            <div class="form-group">
                <label for="text4">Member 4</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Enter member 4 ID number"
                    value={student4}
                    onChange={e => setStudnet4(e.target.value)}
                />
            </div>
            <div className="login-button">
                <button
                type="button"
                class="button"
                onClick={handleSubmit}
                >
                Submit
            </button>
            </div>
        </form>
        </div>
        </div>
        </div>
        </div>
    );
}

