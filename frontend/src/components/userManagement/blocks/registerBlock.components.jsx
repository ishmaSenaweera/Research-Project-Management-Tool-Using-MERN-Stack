import "../../../../../styles/register/register.styles.css";
import Logo from "../../../../../../images/logo/logo.png";
import { useState } from "react";

const BlockRegister = (props) => {
  /* A hook. */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [hometown, setHometown] = useState("");
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
        email,
        mobile,
        nic,
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
          <div className="imgs">
            <img src={Logo} alt="profile" className="profile" />
          </div>
          <div>
            <hr />
            <h1>{props.heading}</h1>
            <form onSubmit={register}>
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
              {props.heading === "Add System Admin" ? (
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
              {props.heading === "Register" ||
              props.heading === "Add Customer" ||
              props.heading === "Add System Admin" ? (
                <>
                  <div>
                    <i className="fas fa-key" />
                    <input
                      type="password"
                      placeholder="Password"
                      className="name"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div className="second-input">
                    <i className="fas fa-key" />
                    <input
                      type="password"
                      placeholder="Password Verify"
                      className="name"
                      onChange={(e) => setPasswordVerify(e.target.value)}
                      value={passwordVerify}
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

export default BlockRegister;
