import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getReportTestById } from "../../modules/reportTestManager";

const DisplayReportTest = () => {
  const { id } = useParams();

  const [reportTest, setReportTest] = useState([]);
  const [reduced, setReduced] = useState([]);
  const [reducedResults, setReducedResults] = useState([]);
  const [reducedDob, setReducedDob] = useState([]);
  const [reducedCollectedDate, setReducedCollectedDate] = useState([]);
  const [reducedCompletedDate, setReducedCompletedDate] = useState([]);

  let patientResults = []
  let patientRace = []
  let patientDOB = []
  let collectedDate = []
  let completedDate = []
  
  const getReportTest = () => {
    getReportTestById(id).then((res) => setReportTest(res));
    }
  function addChartValues(){
    for (const dataObj of reportTest)
  {
    patientResults.push(dataObj.test.results)
    patientRace.push(dataObj.test.patient.race.name)
    patientDOB.push(Date.parse(dataObj.test.patient.dob))
    completedDate.push(Date.parse(dataObj.test.completedDate))
    collectedDate.push(Date.parse(dataObj.test.collectedDate))
  }
  console.log(patientRace)
}


  const groupBy = (list) =>  {
    const newObj = list.reduce((acc, currentValue) => {
        
      if (!acc[currentValue]) {
        acc[currentValue] = [];
      }
      acc[currentValue].push(currentValue);
      return acc;
    }, []);
    return newObj;
  }
  const getReducedRace = () => {
    const resValues = Object.values(groupBy(patientRace))
    setReduced(resValues)
  }
  const getReducedResults = () => {
    const resValues = Object.values(groupBy(patientResults))
    setReducedResults(resValues)
    console.log(resValues + 'Results')
  }
  const getReducedDob = () => {
    const resValues = Object.values(groupBy(patientDOB))
    setReducedDob(resValues)
    console.log(resValues + 'sob')
  }
  const getReducedCollectedDate = () => {
    const resValues = Object.values(groupBy(collectedDate))
    setReducedCollectedDate(resValues)
    console.log(resValues + 'collected')
  }
  const getReducedCompletedDate = () => {
    const resValues = Object.values(groupBy(completedDate))
    setReducedCompletedDate(resValues)
    console.log(resValues + 'Completed')
  }
  
  useEffect(() => {
   addChartValues();
   getReducedRace();
   getReducedResults();
   getReducedDob();
   getReducedCollectedDate();
   getReducedCompletedDate();
  }, [reportTest]);
  useEffect(() => {
    getReportTest();
  }, []);

  return (
    <div>
    {reduced?.map((group) => (
      <div className="d-flex flex-row" key={group[0]}>
        <h3>{group.length} {group[0]}</h3>
      </div>))}
      {reducedResults?.map((group) => (
      <div className="d-flex flex-row" key={group[0]}>
        <h3>{group.length} {group[0].toString()}</h3>
      </div>))}
      {reducedDob?.map((group) => (
      <div className="d-flex flex-row" key={group[0]}>
        <h3>DOB: {group.length} {group[0]}</h3>
      </div>))}
      {reducedCollectedDate?.map((group) => (
      <div className="d-flex flex-row" key={group[0]}>
        <h3>collectedDate:{group.length} {group[0]}</h3>
      </div>))}
      {reducedCompletedDate?.map((group) => (
      <div className="d-flex flex-row" key={group[0]}>
        <h3>Completed Date{group.length} {group[0]}</h3>
      </div>))}
  </div>
  );
};

export default DisplayReportTest;
