import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const Report = ({ report }) => {
  const history = useHistory();
  const handleDelete = () => {
    history.push(`/deleteReport/${report.id}`);
  };
  const handleViewReportTests = () => {
    history.push(`/testreport/${report.id}`);
  };
  return (
    <tbody>
      <tr className="text-left px-2">
        <td>
          <Button
            color="info"
            onClick={() => history.push(`/editReport/${report.id}`)}
          >
            Edit
          </Button>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
        </td>
        <td className="text-left px-2">{report.name}</td>
        <td className="text-left px-2">{report.description}</td>
        <td className="text-left px-2">{report.createdDate}</td>
        <td className="text-left px-2"> 
        <Button color="success" onClick={handleViewReportTests}>
          Add
          </Button>
        </td>
      </tr>
    </tbody>
  );
};
export default Report;
