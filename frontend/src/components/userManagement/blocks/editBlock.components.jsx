import "../../../../../styles/register/register.styles.css";
import Logo from "../../../../../../images/logo/logo.png";
import { useState } from "react";

const BlockEdit = (props) => {
  const data = props.data;

  /* Setting the state of the component. */
  const [name, setName] = useState(data.name);
  const [mobile, setMobile] = useState(data.mobile);
  const [nic, setNic] = useState(data.nic);
  const [email, setEmail] = useState(data.email);
  const [dob, setDob] = useState(data.dobEdited);
  const [hometown, setHometown] = useState(data.hometown);

  /**
   * The function edit() is called when the user clicks the submit button in the form. The function
   * prevents the default action of the submit button, and then calls the edit() function in the parent
   * component, passing the data from the form as an argument.
   */
  function edit(e) {
    e.preventDefault();

    try {
      const editData = {
        name,
        email,
        mobile,
        nic,
        dob,
        hometown,
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
          <div className="imgs">
            <img src={Logo} alt="profile" className="profile" />
          </div>
          <div>
            <hr />
            <h1>{props.heading}</h1>
            <form onSubmit={edit}>
              <div>
                <i className="fas fa-light fa-user" />
                <input
                  type="text"
                  placeholder="Name"
                  className="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div>
                <i className="fas fa-at" />
                <input
                  type="email"
                  placeholder="E-mail"
                  className="name"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <i className="fas fa-phone" />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="name"
                  maxLength="9"
                  pattern="[0-9]+"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                />
              </div>
              <div>
                <i className="fas fa-id-card" />
                <input
                  type="text"
                  placeholder="NIC"
                  className="name"
                  maxLength="11"
                  pattern="[0-9]+"
                  onChange={(e) => setNic(e.target.value)}
                  value={nic}
                />
              </div>
              {props.heading === "Edit System Admin" ||
              props.loggedIn === "SystemAdmin" ? (
                <>
                  <div>
                    <i className="fas fa-calendar" />
                    <input
                      type="date"
                      placeholder="DoB"
                      className="name"
                      onChange={(e) => setDob(e.target.value)}
                      value={dob}
                    />
                  </div>
                  <div>
                    <i className="fas fa-home" />
                    <input
                      type="text"
                      placeholder="Hometown"
                      className="name"
                      onChange={(e) => setHometown(e.target.value)}
                      value={hometown}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="login-button">
                <button className="button" type="submit">
                  <i className="fas fa-solid fa-user-plus"></i>
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
