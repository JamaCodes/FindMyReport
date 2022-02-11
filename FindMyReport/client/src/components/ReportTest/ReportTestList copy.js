import React, { useEffect, useState } from "react";
import ReportTest from "./ReportTest";
import { Button, Table } from "reactstrap";
import { getAllReportTests } from "../../modules/reportTestManager";
import { useHistory } from "react-router-dom"
import TestList from "../Test/TestList";

const ReportTestList = () => {
  const history = useHistory();
  const [reportTests, setReportTests] = useState([]);
  const getReportTests = () => {
    getAllReportTests().then((reportTests) => setReportTests(reportTests));
  };
  useEffect(() => {
    getReportTests();
  }, []);

  return (
    <>
      <div>
      <Button color="info" onClick={() => history.push(`/addReportTest`)}>
                Create New ReportTest
            </Button>
      </div>
      <div>
        <Table className="reportTestList" size="sm">
          <thead>
            <tr>
              <th scope="row">Name</th>
              <th scope="row">Report</th>
              <th scope="row">Test</th>
            </tr>
          </thead>

          {reportTests.map((reportTest) => (
            <ReportTest reportTest={reportTest} key={reportTest.id} />
          ))}
        </Table>
        <TestList/>
      </div>
    </>
  );
};
export default ReportTestList;
