using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FindMyReport.Repositories;
using FindMyReport.Models;

namespace FindMyReport.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly IPatientRepository _patientRepository;
        public PatientController(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var patients = _patientRepository.GetAll();
            return Ok(patients);
        }
        [HttpPost]
        public IActionResult Add(Patient patient)
        {
            _patientRepository.Add(patient);
            return Ok(patient);
        }
        [HttpGet("firstname={FirstName}lastname={LastName}")]
        public IActionResult DoesUserExist(string FirstName, string LastName, DateTime PatientDOB)
        {
            var patient = _patientRepository.GetPatientByName(FirstName, LastName, PatientDOB);
            if (patient == null)
            {
                return NotFound();
            }
            return Ok(true);
        }
    }
}

