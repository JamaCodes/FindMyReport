import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { addReportTest } from "../../modules/reportTestManager";
import { getAllReports } from "../../modules/reportManager";
import { useParams } from "react-router-dom";

const AddReportTest = () => {
    const  testId  = useParams();
    const [report, setReport] = useState([]);
    const [reportTest, setReportTest] = useState({
        testId: testId.id,
        reportId: "",
    });
  const history = useHistory();

  const getReports = () => {
    getAllReports().then((reports) => setReport(reports));
  };

  const handleControlledInputChange = (event) => {
    const newReportTest = { ...reportTest };
    let selectedVal = event.target.value;
    newReportTest[event.target.id] = selectedVal;
    setReportTest(newReportTest);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addReportTest(reportTest).then(() => history.push(`/`));
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <form className="main-content">
      <h2 className="_title">Add ReportTest:</h2>
      <fieldset className="fieldset">
        <div className="form-group">
          <label htmlFor="report">Report</label>
          <select
            value={report.Id}
            name="reportId"
            id="reportId"
            onChange={handleControlledInputChange}
            className="form-control"
          >
            <option value="0">Select a Report</option>
            {report.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
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
        onClick={() => history.push(`/`)}
      >
        Cancel
      </button>
    </form>
  );
};

export default AddReportTest;
