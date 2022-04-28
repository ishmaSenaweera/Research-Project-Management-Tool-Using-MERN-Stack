import React from "react";

function Register() {


    
  return (
      <div>
      <h1>Log in to your account</h1>
      <form>
        <div>
          <input type="text" placeholder="Name" />
        </div>
        <div>
          <input type="date" placeholder="dob" />
        </div>
        <div>
          <input type="radio" value="Male" name="gender" /> Male
          <input type="radio" value="Female" name="gender" /> Female
        </div>
        <div>
          <input type="text" placeholder="Specialization" />
        </div>
        <div>
          <input type="text" placeholder="Batch" />
        </div>
        <div>
          <input type="text" placeholder="Branch" />
        </div>
        <div>
          <input type="text" placeholder="Mobile Number" />
        </div>
        <div>
          <input type="text" placeholder="Nic" />
        </div>
        <div>
          <input type="email" placeholder="E-mail" />
        </div>
        <div>
          <input type="password" placeholder="Password" />
        </div>
        <div>
          <input type="password" placeholder="Password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
