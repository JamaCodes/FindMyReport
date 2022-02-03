using FindMyReport.Models;
using System.Collections.Generic;

namespace FindMyReport.Repositories
{
    public interface ITestRepository
    {
        void Add(Test test);
        void Delete(int id);
        List<Test> GetAll();
        Test GetTestById(int id);
        void Update(Test test);
    }
}