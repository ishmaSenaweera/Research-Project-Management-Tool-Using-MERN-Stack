import Table from "react-bootstrap/esm/Table";
import "./account.css"

const BlockAccount = (props) => {
  /* Destructuring the props object. */
  const { userData } = props;
  const { type } = props;
  const { heading } = props;

  return (
    <div className="main">
      <div className="account-sub-main">
        <div>
          {/* <div className="imgs">
            <img src={Logo} alt="profile" className="profile" />
          </div> */}
          <h1>{props.heading}</h1>
          <hr />
        </div>
        <Table className="table table-hover">
          <tbody>
            <tr>
              <td className="col-sm-6">
                <h2>Name</h2>
              </td>
              <td>
                <h2>{userData.name}</h2>
              </td>
            </tr>
            <tr>
              <td className="col-sm-8">
                <h2>Student ID</h2>
              </td>
              <td>
                <h2>{userData.sid}</h2>
              </td>
            </tr>
            <tr>
              <td>
                <h2>E-mail</h2>
              </td>
              <td>
                <h2>{userData.email}</h2>
              </td>
            </tr>
            <tr>
              <td className="col-sm-4">
                <h2>Nic</h2>
              </td>
              <td className="col-sm-9">
                <h2>{userData.nic}</h2>
              </td>
            </tr>
            {type === "SystemAdmin" ? (
              <>
                <tr>
                  <td className="col-sm-3">
                    <h2>DoB</h2>
                  </td>
                  <td className="col-sm-9">
                    <h2>{userData.dobEdited}</h2>
                  </td>
                </tr>
                <tr>
                  <td className="col-sm-3">
                    <h2>Hometown</h2>
                  </td>
                  <td className="col-sm-9">
                    <h2>{userData.hometown}</h2>
                  </td>
                </tr>
              </>
            ) : (
              ""
            )}
            {type === "HotelAdmin" ? (
              <>
                <tr>
                  <td className="col-sm-3">
                    <h2>DoB</h2>
                  </td>
                  <td className="col-sm-9">
                    <h2>{userData.dob}</h2>
                  </td>
                </tr>
                <tr>
                  <td className="col-sm-3">
                    <h2>Mobile</h2>
                  </td>
                  <td className="col-sm-9">
                    <h2>{userData.phoneNumber}</h2>
                  </td>
                </tr>
                <tr>
                  <td className="col-sm-3">
                    <h2>Address</h2>
                  </td>
                  <td className="col-sm-9">
                    <h2>{userData.address}</h2>
                  </td>
                </tr>
                <tr>
                  <td className="col-sm-3">
                    <h2>Designation</h2>
                  </td>
                  <td className="col-sm-9">
                    <h2>{userData.designation}</h2>
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td className="col-sm-3">
                  <h2>Mobile</h2>
                </td>
                <td className="col-sm-9">
                  <h2>{userData.mobile}</h2>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <button className="btn btn-primary account-button" onClick={props.edit}>
          <i className="fas fa-pen"></i>
          Edit
        </button>
        {heading === "User Account" ? (
          <>
            <button
              className="btn btn-warning account-button"
              onClick={props.changepassword}
            >
              <i className="fas fa-regular fa-key"></i>
              Change Password
            </button>
          </>
        ) : (
          ""
        )}
        <button
          className="btn btn-danger account-button"
          onClick={props.delete}
        >
          <i className="fas fa-user-slash"></i>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlockAccount;
