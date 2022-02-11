import React, { useEffect, useState } from "react";
import Test from "./Test";
import { Button, Table } from "reactstrap";
import { getAllTests } from "../../modules/testManager";
import { useHistory } from "react-router-dom"


const TestList = () => {
  const history = useHistory();
  const [tests, setTests] = useState([]);
 
  const id = localStorage.getItem("ProviderId")

 
  const getTests = () => {
    getAllTests(id).then((tests) => setTests(tests));
  };
  useEffect(() => {
    getTests();
  }, []);

 if (!id){
   return null
 }


  return (
    <div className="p-5">
      <div>
      <Button color="info" onClick={() => history.push(`/addTest`)}>
                Create New Test
            </Button>
      </div>
      <div>
        <Table className="testList" size="sm">
          <thead>
            <tr>
              <th scope="row">Action</th>
              <th scope="row">Sample Type</th>
              <th scope="row">Patient Name</th>
              <th scope="row">Patient DOB</th>
              <th scope="row">Provider Name</th>
              <th scope="row">Collection Date</th>
              <th scope="row">Completed Date</th>
              <th scope="row">Add Test to Report</th>
            </tr>
          </thead>

          {tests.map((test) => (
            <Test test={test} key={test.id} />
          ))}
        </Table>
      </div>
    </div>
  );
};
export default TestList;
