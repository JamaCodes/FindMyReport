import React, { useState } from "react";
import { FindTest } from "../../modules/testManager";
import Test from "./Test";
import { Table } from "reactstrap";



const FindMyTest = () => {
    
    const [test, setTest] = useState({
        id: "",
        dateCollected: "",
    });
    const [newTest, setNewTest] = useState({
        collectionDate: "",
        sampleId: "",
        results: "",
        patientId: "",
        providerId: "",
        completedDate: "",
    })
var results = newTest?.results
    const handleControlledInputChange = (event) => {
        const newTest = { ...test };
        let selectedVal = event.target.value;
        newTest[event.target.id] = selectedVal;
        setTest(newTest);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        FindTest(test.id, test.dateCollected).then((newTest) => setNewTest(newTest));
    };
    return (
        <>
        <form className="main-content">
            <h2 className="_title">Find Test:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="dateCollected">Name:</label>
                    <input
                        type="date"
                        id="dateCollected"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={test.dateCollected}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id">Test Id Number:</label>
                    <input
                        type="text"
                        id="id"
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={test.id} onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button className="btn-add-save" onClick={handleSubmit}>
                Submit
            </button>
            <button
                className="btn-add-edit"
            >
                Cancel
            </button>
        </form>
        <div>
         
  
    </div>
    <div className="testList">
      {
        (results == true)
          ? <div> Something went wrong. You sick. </div> 
          : <div> Everything in the world is fine. You're not dying!</div> 
      }
    </div>
        <Table className="testList" size="sm">
          <thead>
            <tr>
              <th scope="row">Sample Type</th>
              <th scope="row">Patient Name</th>
              <th scope="row">Patient DOB</th>
              <th scope="row">Provider Name</th>
              <th scope="row">Collection Date</th>
              <th scope="row">Completed Date</th>
              <th scope="row">Result</th>
            </tr>
          </thead>   
        <td className="text-left px-2">{newTest?.sample?.name}</td>
        <td className="text-left px-2">{newTest?.patient?.fullName}</td>
        <td className="text-left px-2">{newTest?.patient?.dob}</td>
        <td className="text-left px-2">{newTest?.userProfile?.fullName}</td>
        <td className="text-left px-2">{newTest?.collectionDate}</td>
        <td className="text-left px-2">{newTest?.completedDate}</td>
        <td className="text-left px-2">{newTest?.results ? "positive" : "neagtive"}</td>
        </Table>
        </>
    );
};

export default FindMyTest;
