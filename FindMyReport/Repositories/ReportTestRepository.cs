using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FindMyReport.Models;
using System.Data;
using System.Reflection.PortableExecutable;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using FindMyReport.Utils;

namespace FindMyReport.Repositories
{
    public class ReportTestRepository : BaseRepository, IReportTestRepository
    {
        public ReportTestRepository(IConfiguration config) : base(config) { }

        public ReportTest GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT ReportId, TestId
                         FROM ReportTest
                        WHERE Id = @id;";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    ReportTest ReportTest = new ReportTest();

                    if (reader.Read())
                    {
                        ReportTest.Id = id;
                        ReportTest.TestId = reader.GetInt32(reader.GetOrdinal("TestId"));
                        ReportTest.ReportId = reader.GetInt32(reader.GetOrdinal("ReportId"));
                    }

                    reader.Close();

                    return ReportTest;
                }
            }
        }

        public List<ReportTest> GetReportTestsByReportId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT rt.Id, rt.ReportId, rt.TestId, s.Name as 'SampleType', p.FirstName, p.LastName, p.DOB, t.CollectionDate, t.CompletedDate, rc.Name as 'patientRace', rc.Id as 'RaceId', t.Results, r.Name as 'ReportName', up.FirstName as 'ProviderFirstName', up.LastName as 'ProviderLastName'
                         FROM ReportTest rt
                              LEFT JOIN Test t ON t.Id = rt.TestId
                              LEFT JOIN Report r ON r.id= rt.ReportId
                             JOIN Sample s ON s.id= t.SampleId
                             JOIN Patient p ON p.id= t.PatientId
                             JOIN Race rc ON rc.id= p.RaceId
                             JOIN UserProfile up ON up.id= t.ProviderId
                        WHERE r.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    List<ReportTest> ReportTests = new List<ReportTest> { };

                    while (reader.Read())
                    {
                        ReportTest ReportTest = new ReportTest()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            ReportId = reader.GetInt32(reader.GetOrdinal("ReportId")),
                            Report = new Report
                            {
                                Name = DbUtils.GetString(reader, "ReportName")
                            },
                            TestId = reader.GetInt32(reader.GetOrdinal("TestId")),
                            Test = new Test()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Results = DbUtils.GetBool(reader, "Results"),
                                Provider = new UserProfile()
                                {
                                    FirstName = DbUtils.GetString(reader, "ProviderFirstName"),
                                    LastName = DbUtils.GetString(reader, "ProviderLastName"),
                                },
                                CollectionDate = DbUtils.GetDateTime(reader, "CollectionDate"),
                                CompletedDate = DbUtils.GetDateTime(reader, "CompletedDate"),
                                Sample = new Sample()
                                {
                                    Name = reader.GetString(reader.GetOrdinal("SampleType"))
                                },
                                Patient = new Patient()
                                {
                                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                    DOB = reader.GetDateTime(reader.GetOrdinal("DOB")),
                                    Race = new Race()
                                    {
                                        Id = DbUtils.GetInt(reader, "RaceId"),
                                        Name = reader.GetString(reader.GetOrdinal("patientRace"))
                                    }
                                },
                            }
                        };

                        ReportTests.Add(ReportTest);
                    }

                    reader.Close();

                    return ReportTests;
                }
            }
        }

        public void Add(ReportTest ReportTest)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO ReportTest (ReportId, TestId) OUTPUT INSERTED.ID
                                                     VALUES (@ReportId, @TestId)";
                    cmd.Parameters.AddWithValue("@ReportId", ReportTest.ReportId);
                    cmd.Parameters.AddWithValue("@TestId", ReportTest.TestId);

                    int id = (int)cmd.ExecuteScalar();

                    ReportTest.Id = id;
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
                    cmd.CommandText = @"DELETE FROM ReportTest WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
