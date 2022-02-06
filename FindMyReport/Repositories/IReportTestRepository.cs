using FindMyReport.Models;
using System.Collections.Generic;

namespace FindMyReport.Repositories
{
    public interface IReportTestRepository
    {
        void Add(ReportTest ReportTest);
        void Delete(int id);
        ReportTest GetById(int id);
        List<ReportTest> GetReportTestsByReportId(int id);
    }
}