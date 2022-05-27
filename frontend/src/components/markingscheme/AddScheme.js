import React from "react";
import "../App.css";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const initialState = {
  name: "",
  lecturer_in_charge: "",
  module_name: "",
  creativity: "",
  concept: "",
  quality: "",
};

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  onClear() {
    this.setState(initialState);
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

  SubmitForm = async (e) => {
    e.preventDefault();

    this.validation().then(async (res) => {
      console.log(res);
      if (res) {
        console.log(this.state);
        const url = "http://localhost:1234/scheme/";
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
          .post(url, data, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            console.log(res.data);
            this.setState(initialState);
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Success!"
                  content="Insert Successful!"
                  scheme={Cinnamon.Crisp.SCHEME_GREEN}
                  icon={<CheckCircleOutlineIcon />}
                />
              ),
            });
          });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Typography gutterBottom variant="h3" align="center">
          Marking Scheme Management
        </Typography>
        <Grid>
          <Card
            style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                Add Marking Scheme
              </Typography>
              <br />
              <form autoComplete="off" onSubmit={this.SubmitForm}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Marking Scheme Name"
                      label="Marking Scheme Name"
                      variant="outlined"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Lecturer In Charge"
                      label="Lecturer In Charge"
                      variant="outlined"
                      name="lecturer_in_charge"
                      value={this.state.lecturer_in_charge}
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Module Name"
                      label="Module Name"
                      variant="outlined"
                      name="module_name"
                      value={this.state.module_name}
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      placeholder="Marks for Creativity"
                      label="Marks for Creativity"
                      variant="outlined"
                      min="1"
                      max="100"
                      name="creativity"
                      value={this.state.creativity}
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      placeholder="Marks for Using Concept"
                      label="Marks for Using Concept"
                      variant="outlined"
                      min="1"
                      max="100"
                      name="concept"
                      value={this.state.concept}
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      placeholder="Marks for Quality of the Content"
                      label="Marks for Quality of the Content"
                      variant="outlined"
                      min="1"
                      max="100"
                      name="quality"
                      value={this.state.quality}
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => this.onClear()}
                      fullWidth
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default Add;
