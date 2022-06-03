import React from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const initialState = {
  id: "",
  name: "",
  lecturer_in_charge: "",
  module_name: "",
  creativity: "",
  concept: "",
  quality: "",
  scheme: [],
};

class AllScheme extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const url = "http://localhost:1234/scheme";
    axios
      .get(url)
      .then((response) => this.setState({ scheme: response["data"] }));
  }

  validation = async () => {
    console.log("bb");
    var Error = false;

    if (this.state.name === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="name required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (this.state.lecturer_in_charge === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="lecturer in charge Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (this.state.module_name === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="module name Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (this.state.creativity === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="creativity Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    } else {
      if (this.state.creativity * 1 > 100 || this.state.creativity * 1 < 1) {
        ButterToast.raise({
          content: (
            <Cinnamon.Crisp
              title="Validation Error!"
              content="creativity marks only accept between 1 to 100!"
              scheme={Cinnamon.Crisp.SCHEME_RED}
              icon={<ErrorOutlineIcon />}
            />
          ),
        });
        Error = true;
      }
    }

    if (this.state.concept === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="concept Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    } else {
      if (this.state.concept * 1 > 100 || this.state.concept * 1 < 1) {
        ButterToast.raise({
          content: (
            <Cinnamon.Crisp
              title="Validation Error!"
              content="concept marks only accept between 1 to 100!"
              scheme={Cinnamon.Crisp.SCHEME_RED}
              icon={<ErrorOutlineIcon />}
            />
          ),
        });
        Error = true;
      }
    }

    if (this.state.quality === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="quality Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    } else {
      if (this.state.quality * 1 > 100 || this.state.quality * 1 < 1) {
        ButterToast.raise({
          content: (
            <Cinnamon.Crisp
              title="Validation Error!"
              content="creativity , concept and quality marks only need to equal 100!"
              scheme={Cinnamon.Crisp.SCHEME_RED}
              icon={<ErrorOutlineIcon />}
            />
          ),
        });
        Error = true;
      }
    }

    if (
      !Error &&
      this.state.creativity * 1 +
        this.state.concept * 1 +
        this.state.quality * 1 !==
        100
    ) {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="quality marks only accept between 1 to 100!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (Error) {
      return false;
    }

    return true;
  };

  SubmitForm = async () => {
    this.validation().then(async (res) => {
      console.log(res);
      if (res) {
        console.log(this.state);
        const url = "http://localhost:1234/scheme/" + this.state.id;
        const data = JSON.stringify({
          name: this.state.name,
          lecturer_in_charge: this.state.lecturer_in_charge,
          module_name: this.state.module_name,
          creativity: this.state.creativity,
          concept: this.state.concept,
          quality: this.state.quality,
        });
        console.log(data);
        await axios
          .put(url, data, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            console.log(res.data);
            this.componentDidMount();
            this.setState(initialState);
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Success!"
                  content="Update Successful!"
                  scheme={Cinnamon.Crisp.SCHEME_GREEN}
                  icon={<CheckCircleOutlineIcon />}
                />
              ),
            });
          });
      }
    });
  };

  onDelete(id) {
    const url = "http://localhost:1234/scheme/";
    axios.delete(url + id).then((res) => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Success!"
            content="Delete Successful!"
            scheme={Cinnamon.Crisp.SCHEME_GREEN}
            icon={<CheckCircleOutlineIcon />}
          />
        ),
      });
      this.componentDidMount();
    });
  }

  render() {
    const { scheme } = this.state;
    console.log(scheme);
    const columns = [
      { title: "Name", field: "name" },
      { title: "Lecturer in charge", field: "lecturer_in_charge" },
      { title: "Module Name", field: "module_name" },
      { title: "Marks for Creativity", field: "creativity", type: "numeric" },
      { title: "Marks for Using Concept", field: "concept", type: "numeric" },
      {
        title: "Marks for Quality of the Content",
        field: "quality",
        type: "numeric",
      },
    ];
    return (
      <div>
        <MaterialTable
          title="Marking Scheme Table"
          columns={columns}
          data={scheme}
          options={{
            filtering: true,
            sorting: true,
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowUpdate: (newRow, oldRow) =>
              new Promise(async (resolve, reject) => {
                console.log(newRow);
                await this.setState({
                  id: oldRow._id,
                  name: newRow.name,
                  lecturer_in_charge: newRow.lecturer_in_charge,
                  module_name: newRow.module_name,
                  creativity: newRow.creativity,
                  concept: newRow.concept,
                  quality: newRow.quality,
                });
                this.SubmitForm();
                console.log(oldRow._id);
                setTimeout(() => resolve(), 300);
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                console.log(selectedRow);
                this.onDelete(selectedRow._id);
                setTimeout(() => resolve(), 300);
              }),
          }}
        />
      </div>
    );
  }
}

export default AllScheme;
