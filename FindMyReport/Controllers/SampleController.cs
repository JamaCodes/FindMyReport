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
    public class SampleController : ControllerBase
    {
        private readonly ISampleRepository _sampleRepository;
        public SampleController(ISampleRepository sampleRepository)
        {
            _sampleRepository = sampleRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var samples = _sampleRepository.GetAll();
            return Ok(samples);
        }
        [HttpPost]
        public IActionResult Add(Sample sample)
        {
            _sampleRepository.Add(sample);
            return Ok(sample);
        }
    }
}

