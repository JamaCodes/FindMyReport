using FindMyReport.Models;
using System.Collections.Generic;

namespace FindMyReport.Repositories
{
    public interface IReportRepository
    {
        void Add(Report report);
        void Delete(int id);
        List<Report> GetAll();
        Report GetReportById(int id);
        void Update(Report report);
    }
}