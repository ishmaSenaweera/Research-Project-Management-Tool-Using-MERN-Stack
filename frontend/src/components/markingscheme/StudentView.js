import React, { useState, useEffect } from "react";
import "./App.css";
import GetAppIcon from "@material-ui/icons/GetApp";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function StudentView() {
  const [scheme, setScheme] = useState([]);

  useEffect(() => onReload(), []);

  const onReload = () => {
    const url = "http://localhost:8000/scheme";
    axios.get(url).then((response) => setScheme(response["data"]));
  };

  const generatePdf = async (id) => {
    const doc = new jsPDF("p", "pt", "a4");

    doc.setFontSize(15);
    doc.text("Marking Scheme Report", 40, 40);
    var data;

    const url = "http://localhost:8000/scheme/" + id;
    await axios
      .get(url, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          data = [res.data];

          const headers = [
            [
              "Marking Scheme Name",
              "Lecturer In Charge",
              "Module Name",
              "Marks for Creativity",
              "Marks for Using Concept",
              "Marks for Quality of the Content",
            ],
          ];

          const datas = data.map((elt) => [
            elt.name,
            elt.lecturer_in_charge,
            elt.module_name,
            elt.creativity,
            elt.concept,
            elt.quality,
          ]);

          let content = {
            startY: 50,
            head: headers,
            body: datas,
          };

          doc.autoTable(content);
        } else {
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Connection Error!"
                content="Please Check Your Connection!"
                scheme={Cinnamon.Crisp.SCHEME_RED}
                icon={<ErrorOutlineIcon />}
              />
            ),
          });
        }
      });
    doc.save("Marking_Scheme_Report.pdf");
  };

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
        actions={[
          {
            icon: () => <GetAppIcon />,
            tooltip: "Download PDF",
            onClick: (e, data) => {
              console.log(data._id);
              generatePdf(data._id);
            },
            // isFreeAction:true
          },
        ]}
      />
    </div>
  );
}

export default StudentView;
