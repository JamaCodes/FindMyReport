using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FindMyReport.Models
{
    public class Report
    {
      public int Id { get; set; }
      public string Name { get; set; }
      public string Description { get; set; }
      public DateTime CreatedDate { get; set; }
    }
}