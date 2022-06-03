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

function AddScheme() {
  const [name, setName] = useState("");
  const [lecturer_in_charge, setLecturer_in_charge] = useState("");
  const [module_name, setModule_name] = useState("");
  const [creativity, setCreativity] = useState("");
  const [concept, setConcept] = useState("");
  const [content, setContent] = useState("");

  const setNameForm = (e) => {
    setName(e.target.value);
  };

  const setLecturer_in_chargeForm = (e) => {
    setLecturer_in_charge(e.target.value);
  };

  const setModule_nameForm = (e) => {
    setModule_name(e.target.value);
  };

  const setCreativityForm = (e) => {
    setCreativity(e.target.value);
  };

  const setConceptForm = (e) => {
    setConcept(e.target.value);
  };

  const setContentForm = (e) => {
    setContent(e.target.value);
  };

  const onClear = () => {
    setName("");
    setLecturer_in_charge("");
    setModule_name("");
    setCreativity("");
    setConcept("");
    setContent("");
  };

  const validation = () => {
    console.log("bb");
    var Error = false;

    if (name === "") {
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

    if (lecturer_in_charge === "") {
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

    if (module_name === "") {
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

    if (creativity === "") {
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
      if (creativity * 1 > 100 || creativity * 1 < 1) {
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

    if (concept === "") {
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
      if (concept * 1 > 100 || concept * 1 < 1) {
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

    if (content === "") {
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
      if (content * 1 > 100 || content * 1 < 1) {
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

    if (!Error && creativity * 1 + concept * 1 + content * 1 !== 100) {
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

  const SubmitForm = async (e) => {
    e.preventDefault();

    if (validation()) {
      const url = "http://localhost:8000/scheme/";
      const data = JSON.stringify({
        name: name,
        lecturer_in_charge: lecturer_in_charge,
        module_name: module_name,
        creativity: creativity,
        concept: concept,
        quality: content,
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
                content="Insert Successful!"
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
        Marking Scheme Management
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Add Marking Scheme
            </Typography>
            <br />
            <form autoComplete="off" onSubmit={SubmitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Marking Scheme Name"
                    label="Marking Scheme Name"
                    variant="outlined"
                    name="name"
                    value={name}
                    onChange={setNameForm}
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
                    value={lecturer_in_charge}
                    onChange={setLecturer_in_chargeForm}
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
                    value={module_name}
                    onChange={setModule_nameForm}
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
                    value={creativity}
                    onChange={setCreativityForm}
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
                    value={concept}
                    onChange={setConceptForm}
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
                    value={content}
                    onChange={setContentForm}
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
                    onClick={() => onClear()}
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

export default AddScheme;
