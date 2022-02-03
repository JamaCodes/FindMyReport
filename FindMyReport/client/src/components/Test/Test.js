import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const Test = ({ test }) => {
  const history = useHistory();
  return (
    <tbody>
      <tr className="text-left px-2">
        <Button
          color="info"
          onClick={() => history.push(`/editTest/${test.id}`)}
        >
          Edit
        </Button>
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
