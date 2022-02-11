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
    public class TestController : ControllerBase
    {
        private readonly ITestRepository _testRepository;
        public TestController(ITestRepository testRepository)
        {
            _testRepository = testRepository;
        }

        [HttpGet ("provider/{id}")]
        public IActionResult GetAll(int id)
        {
            var tests = _testRepository.GetAll(id);
            return Ok(tests);
        }
        [HttpPost]
        public IActionResult Add(Test test)
        {
            _testRepository.Add(test);
            return Ok(test);
        }
        [HttpGet("TestsById/{id}")]
        public IActionResult GetByUserId(int id)
        {
            var test = _testRepository.GetTestById(id);
            return Ok(test);
        }
        [HttpGet("{id}")]
        public IActionResult GetTestForEdit(int id)
        {
            var test = _testRepository.GetTestForEdit(id);
            return Ok(test);
        }
      
        [HttpGet("findmytest")]
        public IActionResult FindMyTest(int Id, string CollectionDate)
        {
           var checkDate = CollectionDate;
           var test = _testRepository.GetTestById(Id);
           var testdate = test.CollectionDate.ToString("yyyy/MM/dd");
            if (checkDate == testdate)
            {
            return Ok(test);
            }
            return BadRequest("Something Went Wrong");
        }
        [HttpPut]
        public IActionResult Put(Test test)
        {
        
            _testRepository.Update(test);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _testRepository.Delete(id);
        }
    }
}

