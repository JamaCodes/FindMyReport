using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FindMyReport.Models
{
    public class ReportTest
    {
        public int Id { get; set; }
        public int TestId { get; set; }
        public Test Test { get; set; }
        public int ReportId { get; set; }
        public Report Report { get; set; }
    }
}
