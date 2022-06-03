import React, { useState } from "react";
import "./App.css";
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

function SendFeedback() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onClear = () => {
    setEmail("");
    setMessage("");
  };

  const validation = async () => {
    var Error = false;

    if (email === "") {
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
      if (!validator.isEmail(email)) {
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

    if (message === "") {
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

  const SubmitForm = async (e) => {
    e.preventDefault();

    if (validation()) {
      const url = "http://localhost:8000/scheme/email";
      const data = JSON.stringify({
        email: email,
        subject: "Your Submitted Document",
        message: message,
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          onClear();
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
  };

  return (
    <div className="App">
      <Typography gutterBottom variant="h3" align="center">
        Feedback
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Send Feedback
            </Typography>
            <br />
            <form autoComplete="off" onSubmit={SubmitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Email"
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={email}
                    onChange={setEmail}
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
                    value={message}
                    onChange={setMessage}
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

export default SendFeedback;
