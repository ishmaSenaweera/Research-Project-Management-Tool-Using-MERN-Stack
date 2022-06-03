import Table from "react-bootstrap/esm/Table";
import "../account.css";

const BlockAccount = (props) => {
  /* Destructuring the props object. */
  const { userData } = props;
  const { type } = props;
  const { heading } = props;

  return (
    <div className="main">
      <div className="account-sub-main">
        <div>
          <h1>{props.heading}</h1>
          <hr />
        </div>
        <Table className="table table-bordered">
          <tbody>
            <tr key={1}>
              <td>
                <h3>Name</h3>
              </td>
              <td>
                <h3>{userData.name}</h3>
              </td>
            </tr>
            {type === "Student" && (
              <>
                <tr key={2}>
                  <td>
                    <h3>Student ID</h3>
                  </td>
                  <td>
                    <h3>{userData.sid}</h3>
                  </td>
                </tr>
                <tr key={3}>
                  <td>
                    <h3>Specialization</h3>
                  </td>
                  <td>
                    <h3>{userData.specialization}</h3>
                  </td>
                </tr>
                <tr key={4}>
                  <td>
                    <h3>Batch</h3>
                  </td>
                  <td>
                    <h3>{userData.batch}</h3>
                  </td>
                </tr>
                <tr key={5}>
                  <td>
                    <h3>Branch</h3>
                  </td>
                  <td>
                    <h3>{userData.branch}</h3>
                  </td>
                </tr>
              </>
            )}
            <tr key={6}>
              <td>
                <h3>Date of birth</h3>
              </td>
              <td>
                <h3>{userData.dobEdited}</h3>
              </td>
            </tr>
            <tr key={7}>
              <td>
                <h3>Gender</h3>
              </td>
              <td>
                <h3>{userData.gender}</h3>
              </td>
            </tr>
            <tr key={8}>
              <td>
                <h3>Mobile</h3>
              </td>
              <td>
                <h3>{userData.mobile}</h3>
              </td>
            </tr>
            <tr key={9}>
              <td>
                <h3>NIC</h3>
              </td>
              <td>
                <h3>{userData.nic}</h3>
              </td>
            </tr>
            <tr key={10}>
              <td>
                <h3>E-mail</h3>
              </td>
              <td>
                <h3>{userData.email}</h3>
              </td>
            </tr>
            <tr key={11}>
              <td>
                <h3>Verified</h3>
              </td>
              {userData.verified === true && (
                <td>
                  <h3>E-mail Verified</h3>
                </td>
              )}
              {userData.verified === false && (
                <td>
                  <h3>E-mail Not Verified</h3>
                </td>
              )}
            </tr>
          </tbody>
        </Table>
        <button className="btn btn-primary account-button" onClick={props.edit}>
          Edit
        </button>
        {heading === "User Account" ? (
          <>
            <button
              className="btn btn-warning account-button"
              onClick={props.changepassword}
            >
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
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlockAccount;
