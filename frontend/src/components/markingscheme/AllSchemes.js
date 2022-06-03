import React, { useState , useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Grid , Typography } from "@material-ui/core";
import MaterialTable from 'material-table'
import ButterToast, { Cinnamon } from "butter-toast"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

function AllSchemes() {
  
  const [scheme, setScheme] = useState([]);

  useEffect(() => onReload(), [])

  const onReload = () => {
    const url = "http://localhost:8000/scheme";
    axios
      .get(url)
      .then((response) => setScheme(response["data"]));
  }

  const validation = (name,lecturer_in_charge,module_name,creativity,concept,content) => {
    console.log("bb")
    var Error = false;
  
    if (name==="") {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Validation Error!"
            content="name required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
        />
      })
      Error = true;
    }
  
    if (lecturer_in_charge==="") {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Validation Error!"
            content="lecturer in charge Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
        />
      })
      Error = true;
    }
  
    if (module_name==="") {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Validation Error!"
            content="module name Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
        />
      })
      Error = true;
    }
  
    if (creativity==="") {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Validation Error!"
            content="creativity Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
        />
      })
      Error = true;
    }else{
      if(creativity*1>100||creativity*1<1){
        ButterToast.raise({
          content: <Cinnamon.Crisp title="Validation Error!"
              content="creativity marks only accept between 1 to 100!"
              scheme={Cinnamon.Crisp.SCHEME_RED}
              icon={<ErrorOutlineIcon />}
          />
        })
        Error = true;
      }
    }
  
    if (concept==="") {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Validation Error!"
            content="concept Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
        />
      })
      Error = true;
    }else{
      if(concept*1>100||concept*1<1){
        ButterToast.raise({
          content: <Cinnamon.Crisp title="Validation Error!"
              content="concept marks only accept between 1 to 100!"
              scheme={Cinnamon.Crisp.SCHEME_RED}
              icon={<ErrorOutlineIcon />}
          />
        })
        Error = true;
      }
    }
  
    if (content==="") {
      ButterToast.raise({
        content: 
        <Cinnamon.Crisp title="Validation Error!"
            content="quality Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
        />
      })
      Error = true;
    }else{
      if(content*1>100||content*1<1){
        ButterToast.raise({
          content: <Cinnamon.Crisp title="Validation Error!"
              content="creativity , concept and quality marks only need to equal 100!"
              scheme={Cinnamon.Crisp.SCHEME_RED}
              icon={<ErrorOutlineIcon />}
          />
        })
        Error = true;
      }
    } 
    
    if(!Error&&(creativity*1+concept*1+content*1!==100)){
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Validation Error!"
            content="quality marks only accept between 1 to 100!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
        />
      })
      Error = true;
    }
  
    if (Error) {
      return false;
    }
  
    return true;
  };

  const SubmitForm = async (newRow,oldRow) => {
    if(validation(newRow['name'],newRow['lecturer_in_charge'],newRow['module_name'],newRow['creativity'],newRow['concept'],newRow['quality'])) {

      const url = "http://localhost:8000/scheme/"+oldRow['_id'];
      const data = JSON.stringify({
        name: newRow['name'],
        lecturer_in_charge: newRow['lecturer_in_charge'],
        module_name: newRow['module_name'],
        creativity: newRow['creativity'],
        concept: newRow['concept'],
        quality: newRow['quality']
      });
      console.log(data);
      await axios
        .put(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          onReload()
          ButterToast.raise({
            content: <Cinnamon.Crisp title="Success!"
                content="Update Successful!"
                scheme={Cinnamon.Crisp.SCHEME_GREEN}
                icon={<CheckCircleOutlineIcon />}
            />
          })
        });
    
    }
  };

  const onDelete = (id) => {
    const url = "http://localhost:8000/scheme/";
    axios.delete(url + id).then((res) => {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Success!"
            content="Delete Successful!"
            scheme={Cinnamon.Crisp.SCHEME_GREEN}
            icon={<CheckCircleOutlineIcon />}
        />
      });
      onReload();
    });
  }

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Lecturer in charge', field: 'lecturer_in_charge' },
    { title: 'Module Name', field: 'module_name' },
    { title: 'Marks for Creativity', field: 'creativity', type: 'numeric' },
    { title: 'Marks for Using Concept', field: 'concept', type: 'numeric' },
    { title: 'Marks for Quality of the Content', field: 'quality', type: 'numeric' }
  ]

  return (
    <div className="App">
      <Typography gutterBottom variant="h3" align="center">
        Marking Scheme Table
      </Typography>
      <Grid>
      <MaterialTable title="Marking Scheme Table" columns={columns} data={scheme} 
        options={{
          filtering:true,
          sorting: true,
          actionsColumnIndex: -1
        }} 
        editable={{
          onRowUpdate: (newRow, oldRow) => new Promise(async(resolve, reject) => {
            SubmitForm(newRow,oldRow)
            console.log(oldRow._id)
            setTimeout(() => resolve(), 300)
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            console.log(selectedRow)
            onDelete(selectedRow._id)
            setTimeout(() => resolve(), 300)
          })
        }} />
      </Grid>
    </div>
  );
}

export default AllSchemes;
