import Table from "react-bootstrap/esm/Table";

const BlockList = (props) => {
  const { data } = props;

  function customerList() {
    return data.map((current, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{current.name}</td>
          <td>{current.email}</td>
          {props.heading === "Students" ? (
            <td>{current.sid}</td>
          ) : (
            <td>{current.nic}</td>
          )}

          <td>
            <button
              className="btn btn-primary account-button-blue"
              onClick={props.viewDetails.bind(this, current)}
            >
              <i className="fas fa-eye"></i>
              View
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="list">
      <div className="list-sub-table">
        <div className="head">
          <h1>{props.heading}</h1>
          <button
            className="btn btn-primary account-button-blue-add"
            onClick={props.addCustomer}
          >
            <i className="fas fa-plus"></i>
            Add
          </button>
        </div>
        <hr />
        <Table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              {props.heading === "Students" ? (
                <th>Student ID</th>
              ) : (
                <th>Nic</th>
              )}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{customerList()}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default BlockList;
