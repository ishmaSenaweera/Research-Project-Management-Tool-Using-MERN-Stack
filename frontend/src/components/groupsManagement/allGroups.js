import React, { useState, useEffect } from "react";
import axios from "axios";


export default function AllGroups() {
  const [groups, setGroups] = useState([]);
  
  useEffect( ()=> {
    console.log("use eff");
    axios.get("http://localhost:8000/groups/").then(res => {
      console.log("res", res);
      setGroups(res.data.allgroups);
      console.log(groups)
    });
    
  }, []);



  return (
    <table class="table ">
      <thead>
        <tr>
        <th scope="col">Group ID</th>
          <th scope="col">student 1</th>
          <th scope="col">student 2</th>
          <th scope="col">student 3</th>
          <th scope="col">student 4</th>

        </tr>
      </thead>
      <tbody>
          {groups && groups.map(group => (
            <tr>
              <td>{group.gid}</td>
              <td>{group.student1}</td>
              <td>{group.student2}</td>
              <td>{group.student3}</td>
              <td>{group.student4}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}