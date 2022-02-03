import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { addTest } from "../../modules/testManager";
import { getAllPatients } from "../../modules/patientManager";
import {getAllSamples} from "../../modules/sampleManager"


const AddTest = () => {
    const [patient, setPatients] = useState([]);
    const [sample, setSample] = useState([]);
    const history = useHistory();
    const providerId = localStorage.getItem("ProviderId")


    let today = new Date(Date.now())

    const [test, setTest] = useState({
        collectionDate: Date.now(),
        sampleId: "",
        results: false,
        patientId: "",
        userProfileId: providerId,
        completedDate:  today.toISOString()
    });

  
    const getPatients = () => {
        getAllPatients().then((patient) => setPatients(patient));
    };
    const getSamples = () => {
        getAllSamples().then((sample) => setSample(sample));
    };

    const handleControlledInputChange = (event) => {
        const newTest = { ...test };
        let selectedVal = event.target.value;
        newTest[event.target.id] = selectedVal;
        setTest(newTest);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addTest(test);
    };

    useEffect(() => {
        getPatients();
        getSamples();
    }, []);



    return (
        <form className="main-content">
            <h2 className="_title">Add Test:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="collectionDate">CollectionDate:</label>
                    <input
                        type="date"
                        id="collectionDate"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={test.collectionDate}
                    />
                </div>

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

export default AddTest;
