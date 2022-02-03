using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FindMyReport.Utils;
using FindMyReport.Models;
using Microsoft.Data.SqlClient;

namespace FindMyReport.Repositories
{
    public class SampleRepository : BaseRepository, ISampleRepository

    {
        public SampleRepository(IConfiguration config) : base(config) { }
        public List<Sample> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, Name from Sample
                             ";

                    var samples = new List<Sample>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        samples.Add(NewSampleFromReader(reader));
                    }
                    reader.Close();
                    return samples;
                }
            }
        }
        public void Add(Sample sample)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Patient (
                          Id, Name
                        OUTPUT INSERTED.ID
                        VALUES (
                           @Id, @Name)";
                    cmd.Parameters.AddWithValue("@Name", sample.Name);
                    sample.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        private Sample NewSampleFromReader(SqlDataReader reader)
        {
            return new Sample()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
            };
        }
    }
}
