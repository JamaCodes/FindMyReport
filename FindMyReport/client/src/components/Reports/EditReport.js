import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { UpdateReport } from "../../modules/reportManager";
import { getAllPatients } from "../../modules/patientManager";
import {getAllSamples} from "../../modules/sampleManager";
import { useParams } from "react-router-dom/";
import { getReportById } from "../../modules/reportManager";


const EditReport = () => {
    const history = useHistory();
    

    const [report, setReport] = useState({
        name: "",
        description: "",
        createDate:  report.createDate,
    });
    const { id } = useParams();

    const getReport = () => {
        getReportById(id).then(res => setReport(res))
        };

    const handleControlledInputChange = (event) => {
        const newReport = { ...report };
        let selectedVal = event.target.value;
        newReport[event.target.id] = selectedVal;
        setReport(newReport);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
       UpdateReport(report).then(() => history.push(`/reportlist`));;
    };

    useEffect(() => {
        getReport();
    }, []);



    return (
        <form className="main-content">
          <h2 className="_title">Edit Report:</h2>
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
                        value={report.name}
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
                        value={report.description}
                    />
                </div>

            </fieldset>
            <button className="btn-add-save" onClick={handleSubmit}>
                Submit
            </button>
            <button
                className="btn-add-edit"
                onClick={() => history.push(`/myReports`)}
            >
                Cancel
            </button>
        </form>
    );
};

export default EditReport;
