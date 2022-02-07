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
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;
        public ReportController(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var reports = _reportRepository.GetAll();
            return Ok(reports);
        }
        [HttpPost]
        public IActionResult Add(Report report)
        {
            _reportRepository.Add(report);
            return Ok(report);
        }
        [HttpGet("ReportsById/{id}")]
        public IActionResult GetByUserId(int id)
        {
            var report = _reportRepository.GetReportById(id);
            return Ok(report);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Report report)
        {
            if (id != report.Id)
            {
                return BadRequest();
            }

            _reportRepository.Update(report);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _reportRepository.Delete(id);
        }
    }
}

