import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { UpdateReportTest } from "../../modules/reportTestManager";
import { getAllPatients } from "../../modules/patientManager";
import {getAllSamples} from "../../modules/sampleManager";
import { useParams } from "react-router-dom/";
import { getReportTestById } from "../../modules/reportTestManager";


const EditReportTest = () => {
    const [reportTest, setReportTest] = useState({
        name: "",
        description: "",
        createDate:  createDate,
    });
    const history = useHistory();
    const { id } = useParams();

    const getReportTest = () => {
        getReportTestById(id).then(res => setReportTest(res))
        };

    const handleControlledInputChange = (event) => {
        const newReportTest = { ...reportTest };
        let selectedVal = event.target.value;
        newReportTest[event.target.id] = selectedVal;
        setReportTest(newReportTest);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
       UpdateReportTest(reportTest).then(() => history.push(`/reportTestlist`));;
    };

    useEffect(() => {
        getReportTest();
    }, []);



    return (
        <form className="main-content">
          <h2 className="_title">Edit ReportTest:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="date"
                        id="name"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={reportTest.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        type="date"
                        id="description"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={reportTest.description}
                    />
                </div>

            </fieldset>
            <button className="btn-add-save" onClick={handleSubmit}>
                Submit
            </button>
            <button
                className="btn-add-edit"
                onClick={() => history.push(`/myReportTests`)}
            >
                Cancel
            </button>
        </form>
    );
};

export default EditReportTest;
