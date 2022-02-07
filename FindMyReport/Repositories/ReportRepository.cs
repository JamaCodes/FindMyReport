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
    public class ReportRepository : BaseRepository, IReportRepository
    {
        public ReportRepository(IConfiguration config) : base(config) { }
        public List<Report> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT r.Id, r.Name, r.Description, r.CreatedDate
                           FROM Report r
                             ";

                    var reports = new List<Report>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        reports.Add(NewReportFromReader(reader));
                    }
                    reader.Close();
                    return reports;
                }
            }
        }
        public Report GetReportById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT r.Id, r.Name, r.Description, r.CreatedDate
                           FROM Report r
                           WHERE r.id = @id ";
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();
                    Report report = null;
                    if (reader.Read())
                    {
                        report = NewReportFromReader(reader);
                    }
                    reader.Close();
                    return report;
                }
            }
        }
        public void Add(Report report)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Report (
                            Name, Description, CreatedDate)
                        OUTPUT INSERTED.ID
                        VALUES (
                           @Name, @Description, @CreatedDate)";
                    cmd.Parameters.AddWithValue("@Name", report.Name);
                    cmd.Parameters.AddWithValue("@Description", report.Description);
                    cmd.Parameters.AddWithValue("@CreatedDate", report.CreatedDate);
                    report.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Report report)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {


                    cmd.CommandText = @"UPDATE Report 
                                           SET Name = @Name,
                                                Description = @Description,
                                                CreatedDate = @CreatedDate
                                         WHERE id = @id";

                    cmd.Parameters.AddWithValue("@Name", report.Name);
                    cmd.Parameters.AddWithValue("@Description", report.Description);
                    cmd.Parameters.AddWithValue("@CreatedDate", report.CreatedDate);
                    cmd.Parameters.AddWithValue("@id", report.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Report WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        private Report NewReportFromReader(SqlDataReader reader)
        {
            return new Report()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Description = DbUtils.GetString(reader, "Description"),
                CreatedDate = DbUtils.GetDateTime(reader, "CreatedDate"),
            };
        }
    }
}
