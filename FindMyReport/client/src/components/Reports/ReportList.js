import React, { useEffect, useState } from "react";
import Report from "./Report";
import { Button, Table } from "reactstrap";
import { getAllReports } from "../../modules/reportManager";
import { useHistory } from "react-router-dom"

const ReportList = () => {
  const history = useHistory();
  const [reports, setReports] = useState([]);
  const getReports = () => {
    getAllReports().then((reports) => setReports(reports));
  };
  useEffect(() => {
    getReports();
  }, []);

  return (
    <>
      <div>
      <Button color="info" onClick={() => history.push(`/addReport`)}>
                Create New Report
            </Button>
      </div>
      <div>
        <Table className="reportList" size="sm" striped="true">
          <thead>
            <tr>
              <th scope="row">Name</th>
              <th scope="row">Description</th>
              <th scope="row">Created Date</th>
            </tr>
          </thead>

          {reports.map((report) => (
            <Report report={report} key={report.id} />
          ))}
        </Table>
      </div>
    </>
  );
};
export default ReportList;
