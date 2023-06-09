import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";
import "./DoctorList.css";

const DoctorList: React.FunctionComponent = () => {
  const [allDoctors, setAllDoctors] = useState<any[]>([]);
  console.log(allDoctors);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerClassName: "doctor-table-header",
    },
    {
      field: "fullName",
      headerName: "Full Name",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      headerClassName: "doctor-table-header",
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.fullName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      editable: true,
      headerClassName: "doctor-table-header",
    },
    {
      field: "specialization",
      headerName: "Specialization",
      width: 130,
      editable: true,
      headerClassName: "doctor-table-header",
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "phone",
      width: 180,
      editable: true,
      headerClassName: "doctor-table-header",
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      editable: true,
      headerClassName: "doctor-table-header",
      renderCell: (params: any) => (
        <StatusCell onClick={() => handleStatusCellClick(params)}>
          {params.value}
        </StatusCell>
      ),
    },
  ];

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/alldoctors"
        );
        const data = response.data.allDoctors;
        setAllDoctors(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setAllDoctors]);

  const handleStatusCellClick = async (params: GridValueGetterParams) => {
    console.log(params.row.id);
    window.location.reload();

    await axios.put(
      `http://localhost:5000/auth/verify-doctor/${params.row.id}`
    );
    // console.log(response);

    // const updatedDoctors = allDoctors.map((doctor) => {
    //   if (doctor.id === params.row.id) {
    //     const newStatus = params.value === "pending" ? "verified" : "pending";
    //     console.log(newStatus);
    //     return { ...doctor, status: newStatus };
    //   }
    //   return doctor;
    // });
    // setAllDoctors(updatedDoctors);
  };

  return (
    <DoctorContainer>
      <div className="tablegrid-container">
        <DataGrid
          rows={allDoctors}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
        />
      </div>
    </DoctorContainer>
  );
};

export default DoctorList;

const DoctorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  width: 83vw;
  height: 100vh;
  margin-left: 15.5rem;
  background-color: #e0e0e0;
  overflow: auto;
`;

const StatusCell = styled.div`
  cursor: pointer;
  /* Additional styles for StatusCell */
`;
