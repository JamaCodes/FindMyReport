using FindMyReport.Models;
using System.Collections.Generic;

namespace FindMyReport.Repositories
{
    public interface ISampleRepository
    {
        void Add(Sample sample);
        List<Sample> GetAll();
    }
}