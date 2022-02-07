import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const ReportTest = ({ reportTest }) => {
  const history = useHistory();
  const handleDelete = () => {
    history.push(`/deleteReportTest/${reportTest.id}`);
  };
  return (
    <tbody>
      <tr className="text-left px-2">
        <td>
          <Button
            color="info"
            onClick={() => history.push(`/editReportTest/${reportTest.id}`)}
          >
            Edit
          </Button>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
        </td>
        <td className="text-left px-2">{reportTest.name}</td>
        <td className="text-left px-2">{reportTest.testId}</td>
        <td className="text-left px-2">{reportTest.reportId}</td>
      </tr>
    </tbody>
  );
};
export default ReportTest;
