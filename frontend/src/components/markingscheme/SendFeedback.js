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
import validator from "validator";

const initialState = {
  email: "",
  message: "",
};

class SendFeedback extends React.Component {
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
    console.log(this.state.email);
    var Error = false;

    if (this.state.email === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="email required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    } else {
      if (!validator.isEmail(this.state.email)) {
        ButterToast.raise({
          content: (
            <Cinnamon.Crisp
              title="Validation Error!"
              content="Wrong Email!"
              scheme={Cinnamon.Crisp.SCHEME_RED}
              icon={<ErrorOutlineIcon />}
            />
          ),
        });
        Error = true;
      }
    }

    if (this.state.message === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Message Required!"
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
        const url = "http://localhost:1234/scheme/email";
        const data = JSON.stringify({
          email: this.state.email,
          subject: " feedback about Your Submitted Document/presentation",
          message: this.state.message,
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
                  content="Send Successful!"
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
          Feedback
        </Typography>
        <Grid>
          <Card
            style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                Send Feedback
              </Typography>
              <br />
              <form autoComplete="off" onSubmit={this.SubmitForm}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Email"
                      label="Email"
                      variant="outlined"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Message"
                      label="Message"
                      variant="outlined"
                      name="message"
                      multiline
                      rows={4}
                      value={this.state.message}
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
                      Send
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

export default SendFeedback;
