import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { UpdateTest } from "../../modules/testManager";
import { getAllPatients } from "../../modules/patientManager";
import {getAllSamples} from "../../modules/sampleManager";
import { useParams } from "react-router-dom/";
import { getTestForEdit } from "../../modules/testManager";


const EditTest = () => {
    const [patient, setPatients] = useState([]);
    const [sample, setSample] = useState([]);
    const history = useHistory();
    
    const { id } = useParams();
  
    const [test, setTest] = useState({
        id: 15,
        sampleId: 1,
        patientId: 8,
        results: true,
        collectionDate: "",
        providerId: 1,
        completedDate: "",
    });


  
    const getPatients = () => {
        getAllPatients().then((patient) => setPatients(patient));
    };
    const getSamples = () => {
        getAllSamples().then((sample) => setSample(sample));
    };

    const getTest = () => {
        getTestForEdit(id).then(res => setTest(res))
        };

    const handleControlledInputChange = (event) => {
        const newTest = { ...test };
        let selectedVal = event.target.value;
        console.log(selectedVal)
     
        newTest[event.target.id] = selectedVal;
        setTest(newTest);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
       UpdateTest(test).then(() => history.push(`/test`));;
    };

    useEffect(() => {
        getPatients();
        getSamples();
        getTest();
     
    }, []);

   

    return (
        <form className="main-content">
            <h2 className="_title">Edit Test:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="content">Type:</label>
                    <select
                        value={test.sampleId}
                        name="sampleId"
                        id="sampleId"
                        onChange={handleControlledInputChange}
                        className="form-control"
                    >
                        <option value="0">Select a Sample Type</option>
                        {sample.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="results">Results</label>
                    <select name="results" 
                    id="results" 
                    value={test.results}
                    onChange={handleControlledInputChange}
                    >
                    <option value={false}>Negative</option>
                    <option value={true}>Positive</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="patient">Patient</label>
                    <select
                        value={test.patientId}
                        name="patientId"
                        id="patientId"
                        onChange={handleControlledInputChange}
                        className="form-control"
                    >
                        <option value="0">Select a Patient</option>
                        {patient.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.firstName}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button className="btn-add-save" onClick={handleSubmit}>
                Submit
            </button>
            <button
                className="btn-add-edit"
                onClick={() => history.push(`/myTests`)}
            >
                Cancel
            </button>
        </form>
    );
};

export default EditTest;
