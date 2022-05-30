import { useState } from "react";

const BlockEdit = (props) => {
  const data = props.data;

  /* Setting the state of the component. */
  const [id] = useState(data._id);
  const [name, setName] = useState(data.name);
  const [mobile, setMobile] = useState(data.mobile);
  const [nic, setNic] = useState(data.nic);
  const [email, setEmail] = useState(data.email);
  const [dob, setDob] = useState(data.dobEdited);
  const [sid, setSid] = useState(data.sid);
  const [gender, setGender] = useState(data.gender);
  const [specialization, setSpecialization] = useState(data.specialization);
  const [batch, setBatch] = useState(data.batch);
  const [branch, setBranch] = useState(data.branch);

  /**
   * The function edit() is called when the user clicks the submit button in the form. The function
   * prevents the default action of the submit button, and then calls the edit() function in the parent
   * component, passing the data from the form as an argument.
   */
  function edit(e) {
    e.preventDefault();

    try {
      const editData = {
        id,
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
      };
      /* Calling the edit function in the parent component, passing the data from the form as an argument. */
      props.edit(editData);
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
            <form onSubmit={edit}>
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
              {props.loggedIn === "Student" && (
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
                <span className="form-radio">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="male"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked={data.gender === "male"}
                  />
                  Male
                </span>
                <span className="form-radio">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="female"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked={data.gender === "female"}
                  />
                  Female
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
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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

export default BlockEdit;
