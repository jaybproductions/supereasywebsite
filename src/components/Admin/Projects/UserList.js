import React from "react";
import UserItem from "./UserItem";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const UserList = ({ users }) => {
  let history = useHistory();
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "projectStatus", headerName: "Project Status", width: 250 },
    {
      field: "",
      headerName: "Go To Project",
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          const api = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== "__check__" && !!c);
          const thisRow = {};

          fields.forEach((f) => {
            thisRow[f] = params.getValue(f);
          });
          return history.push(`/admin/project/${thisRow.id}`);
        };

        return <Button onClick={onClick}>View</Button>;
      },
    },
  ];

  return (
    <div className="user-list">
      <div style={{ height: 400, width: "80vw", margin: "auto" }}>
        <DataGrid rows={users} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default UserList;
