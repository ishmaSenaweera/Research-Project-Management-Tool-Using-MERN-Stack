import { useState } from "react";

const BlockRegister = (props) => {
  /* A hook. */
  const [name, setName] = useState("");
  const [sid, setSid] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [batch, setBatch] = useState("");
  const [branch, setBranch] = useState("");
  const [mobile, setMobile] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  /**
   * When the user clicks the submit button, prevent the default action, then try to register the user
   * with the data they entered, and if there's an error, log it to the console and alert the user.
   */
  function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        name,
        sid,
        dob,
        gender,
        specialization,
        batch,
        branch,
        mobile,
        nic,
        email,
        password,
        passwordVerify,
      };
      /* Calling the register function in the parent component. */
      props.register(registerData);
    } catch (err) {
      console.error(err);
      alert(err.response.data.errorMessage);
    }
  }

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div>
            <h1>{props.heading}</h1>
            <hr />
            <form onSubmit={register}>
              <div>
                <label>Name: </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="form-input"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              {props.heading === "Register" && (
                <>
                  <div>
                    <label>SLIIT ID: </label>
                    <input
                      type="text"
                      placeholder="SLIIT ID"
                      className="form-input"
                      maxLength={10}
                      required
                      onChange={(e) => setSid(e.target.value)}
                      value={sid}
                    />
                  </div>
                  <div>
                    <label>Specialization: </label>
                    <input
                      type="text"
                      placeholder="Specialization"
                      className="form-input"
                      required
                      onChange={(e) => setSpecialization(e.target.value)}
                      value={specialization}
                    />
                  </div>
                  <div>
                    <label>Batch: </label>
                    <input
                      type="text"
                      placeholder="Batch"
                      className="form-input"
                      required
                      onChange={(e) => setBatch(e.target.value)}
                      value={batch}
                    />
                  </div>
                  <div>
                    <label>Branch: </label>
                    <input
                      type="text"
                      placeholder="Branch"
                      className="form-input"
                      required
                      onChange={(e) => setBranch(e.target.value)}
                      value={branch}
                    />
                  </div>
                </>
              )}
              <div>
                <label>Date of birth: </label>
                <input
                  type="date"
                  placeholder="dob"
                  className="form-input"
                  required
                  onChange={(e) => setDob(e.target.value)}
                  value={dob}
                />
              </div>
              <div className="form-radio-space">
                <label>Gender: </label>
                <span
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <span className="form-radio">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="male"
                      name="gender"
                    />
                    Male
                  </span>
                  <span className="form-radio">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="female"
                      name="gender"
                    />
                    Female
                  </span>
                </span>
              </div>
              <div>
                <label>Mobile Number: </label>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="form-input"
                  maxLength="10"
                  required
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                />
              </div>
              <div>
                <label>Nic: </label>
                <input
                  type="text"
                  placeholder="Nic"
                  className="form-input"
                  maxLength="11"
                  required
                  onChange={(e) => setNic(e.target.value)}
                  value={nic}
                />
              </div>
              <div>
                <label>E-mail: </label>
                <input
                  type="email"
                  placeholder="E-mail"
                  className="form-input"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label>Password: </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div>
                <label>Verify Password: </label>
                <input
                  type="password"
                  placeholder="Verify Password"
                  className="form-input"
                  required
                  onChange={(e) => setPasswordVerify(e.target.value)}
                  value={passwordVerify}
                />
              </div>
              <div className="login-button">
                <button className="button" type="submit">
                  {props.heading}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockRegister;
