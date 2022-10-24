import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import UserModal from "./UserModal";
import FileDownload from "js-file-download";
import axios from "axios";
let gridApi;
const initialValue = {
  id: "",
  mname: "",
  surname: "",
  age: "",
  gender: "",
  passport: "",
  password: "",
  select: "",
  email: "",
};
const backendURL = "http://localhost:8000";
function MainDial() {
  const history = useNavigate();
  // const [gridApi, setGridApi] = useState(null)
  const [tableData, setTableData] = useState(null);
  const [formData, setFormData] = useState(initialValue);
  const url = `${backendURL}/getAllUsers`;
  const columnDefs = [
    // { headerName: "ID", field: "_id" },
    { headerName: " Nombre", field: "mname" },
    { headerName: " Apellido", field: "surname" },
    { headerName: "Identificación", field: "passport" },
    { headerName: "TipoUsuario", field: "select" },
    { headerName: "Email", field: "email" },
    { headerName: "Género", field: "gender" },
    {
      headerName: "Acciones",
      filter: false,
      floatingFilter: false,
      field: "_id",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-primary  fs-3"
            onClick={() => handleUpdate(params.data)}
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            className="btn btn-danger  m-2 fs-3"
            onClick={() => handleDelete(params.value)}
          >
            <i class="fa-solid fa-trash"></i>
          </button>

      
        </div>
      ),
    },
  ];
  // calling getUsers function for first time
  useEffect(() => {
    getUsers();
  }, []);

  //fetching user data from server
  const getUsers = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const onExportButton = () => {
    gridApi.exportDataAsCsv();
  };
  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData);
    // handleClickOpen()
    history(`/getUser/:file/${oldData._id}`);
  };
  //deleting a user
  const handleDelete = (_id) => {
    const confirm = window.confirm(
      "Estás seguro de borrar esta fila?",
      _id
    );
    if (confirm) {
      fetch(`${backendURL}/deleteUser` + `/${_id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getUsers());
    }
  };
  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };
  return (
    <div className="App">
      {/* <Grid align="right">
    
      </Grid> */}

      <div className="ag-theme-alpine" style={{ height: "500px" }}>
        <div className="d-flex justify-content-between ">
          <button
            onClick={() => onExportButton()}
            style={{ backgroundColor: "#6f5de7", color: "white" }}
            className="btn btn-primary fs-3"
          >
            Exportar Datos
          </button>
          <UserModal />
        </div>

        <AgGridReact
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}

export default MainDial;
