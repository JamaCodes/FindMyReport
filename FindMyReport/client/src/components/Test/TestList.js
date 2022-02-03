import React, { useEffect, useState } from "react";
import Test from "./Test";
import { Button, Table } from "reactstrap";
import { getAllTests } from "../../modules/testManager";

const TestList = () => {
  // const history = useHistory();
  const [tests, setTests] = useState([]);
  const getTests = () => {
    getAllTests().then((tests) => setTests(tests));
  };
  useEffect(() => {
    getTests();
  }, []);

  return (
    <>
      <div>
        <Button>Create Test</Button>
      </div>
      <div>
        <Table className="testList" size="sm" striped="true">
          <thead>
            <tr>
              <th scope="row">#</th>
              <th scope="row">Sample Type</th>
              <th scope="row">Patient Name</th>
              <th scope="row">Patient DOB</th>
              <th scope="row">Provider Name</th>
              <th scope="row">Collection Date</th>
              <th scope="row">Completed Date</th>
            </tr>
          </thead>

          {tests.map((test) => (
            <Test test={test} key={test.id} />
          ))}
        </Table>
      </div>
    </>
  );
};
export default TestList;
