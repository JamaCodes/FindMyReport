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
    public class TestRepository : BaseRepository, ITestRepository
    {
        public TestRepository(IConfiguration config) : base(config) { }
        public List<Test> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT t.Id, t.SampleId, t.PatientId, p.FirstName, t.CollectionDate, t.ProviderId, up.FirstName as ProviderFirstName, up.LastName as ProviderLastName, t.CompletedDate, t.Results, s.Name as Name
                           FROM Test t
                           Left Join Sample s on t.SampleId = s.id
                           left Join Patient p on t.PatientId = p.Id
                           left join Userprofile up on t.ProviderId = up.Id
                             ";

                    var tests = new List<Test>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        tests.Add(NewTestFromReader(reader));
                    }
                    reader.Close();
                    return tests;
                }
            }
        }
        public Test GetTestById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT t.Id, t.SampleId, t.PatientId, p.FirstName, t.CollectionDate, t.ProviderId, up.FirstName as ProviderFirstName, up.LastName as ProviderLastName, t.CompletedDate, t.Results, s.Name as Name
                           FROM Test t
                           Left Join Sample s on t.SampleId = s.id
                           left Join Patient p on t.PatientId = p.Id
                           left join Userprofile up on t.ProviderId = up.Id
                           WHERE t.id = @id ";
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();
                    Test test = null;
                    if (reader.Read())
                    {
                        test = NewTestFromReader(reader);
                    }
                    reader.Close();
                    return test;
                }
            }
        }
        public void Add(Test test)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Test (
                            SampleId, PatientId, Results, CollectionDate, ProviderId, CompletedDate)
                        OUTPUT INSERTED.ID
                        VALUES (
                           @SampleId, @PatientId, @Results, @CollectionDate, @ProviderId, @CompletedDate)";
                    cmd.Parameters.AddWithValue("@SampleId", test.SampleId);
                    cmd.Parameters.AddWithValue("@PatientId", test.PatientId);
                    cmd.Parameters.AddWithValue("@Results", test.Results);
                    cmd.Parameters.AddWithValue("@CollectionDate", test.CollectionDate);
                    cmd.Parameters.AddWithValue("@ProviderId", test.ProviderId);
                    cmd.Parameters.AddWithValue("@CompletedDate", test.CompletedDate);
                    test.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Test test)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {


                    cmd.CommandText = @"UPDATE Test 
                                           SET SampleId = @SampleId,
                                                PatientId = @PatientId,
                                                Results = @Results,
                                                CollectionDate = @CollectionDate,
                                                ProviderId = @ProviderId,
                                                CompletedDate = @CompletedDate
                                         WHERE id = @id";

                    cmd.Parameters.AddWithValue("@SampleId", test.SampleId);
                    cmd.Parameters.AddWithValue("@PatientId", test.PatientId);
                    cmd.Parameters.AddWithValue("@Results", test.Results);
                    cmd.Parameters.AddWithValue("@categoryId", test.CollectionDate);
                    cmd.Parameters.AddWithValue("@userProfileId", test.ProviderId);
                    cmd.Parameters.AddWithValue("@CompletedDate", test.CompletedDate);
                    cmd.Parameters.AddWithValue("@id", test.Id);

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
                    cmd.CommandText = @"DELETE FROM TEST WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        private Test NewTestFromReader(SqlDataReader reader)
        {
            return new Test()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                PatientId = DbUtils.GetInt(reader, "PatientId"),
                Results = DbUtils.GetBool(reader, "Results"),
                ProviderId = DbUtils.GetInt(reader, "ProviderId"),
                CollectionDate = DbUtils.GetDateTime(reader, "CollectionDate"),
                CompletedDate = DbUtils.GetDateTime(reader, "CompletedDate"),
                SampleId = DbUtils.GetInt(reader, "SampleId"),
                Sample = new Sample()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Name = reader.GetString(reader.GetOrdinal("Name"))
                },
                Patient = new Patient()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName"))
                },
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "Id"),
                    FirstName = DbUtils.GetString(reader, "ProviderFirstName"),
                    LastName = DbUtils.GetString(reader, "ProviderLastName"),
                },
            };
        }
    }
}
