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
    public class ReportTestController : ControllerBase
    {
        private readonly IReportTestRepository _reportTestRepository;
        public ReportTestController(IReportTestRepository reportTestRepository)
        {
            _reportTestRepository = reportTestRepository;
        }

        [HttpGet ("ReportTestById")]
        public IActionResult GetReportTestsByReportId(int id)
        {
      
            var reportTests = _reportTestRepository.GetReportTestsByReportId(id);
            return Ok(reportTests);
        }
        [HttpPost]
        public IActionResult Add(ReportTest reportTest)
        {
           
            _reportTestRepository.Add(reportTest);
            return Ok(reportTest);
        }
    }
}

