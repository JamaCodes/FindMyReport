using FindMyReport.Models;
using System;
using System.Collections.Generic;

namespace FindMyReport.Repositories
{
    public interface IPatientRepository
    {
        void Add(Patient patient);
        List<Patient> GetAll();
        Patient GetPatientByName(string FirstName, string LastName, DateTime PatientDOB);
    }
}