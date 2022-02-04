import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const Test = ({ test }) => {
  const history = useHistory();
  const handleDelete = () => {
    history.push(`/deleteTest/${test.id}`);
  };
  return (
    <tbody>
      <tr className="text-left px-2">
        <td>
          <Button
            color="info"
            onClick={() => history.push(`/editTest/${test.id}`)}
          >
            Edit
          </Button>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
        </td>
        <td className="text-left px-2">{test.sample.name}</td>
        <td className="text-left px-2">{test.patient.fullName}</td>
        <td className="text-left px-2">{test.patient.dob}</td>
        <td className="text-left px-2">{test.userProfile.fullName}</td>
        <td className="text-left px-2">{test.collectionDate}</td>
        <td className="text-left px-2">{test.completedDate}</td>
      </tr>
    </tbody>
  );
};
export default Test;
