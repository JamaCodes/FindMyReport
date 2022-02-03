import React from "react";

const Test = ({ test }) => {
  return (
    <tbody>
    <tr className="text-left px-2">
      <td className="text-center px-2">{test.id}</td>
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
