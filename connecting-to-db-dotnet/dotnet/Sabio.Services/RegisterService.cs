using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Sabio.Services
{
    public class RegisterService : IRegisterService
    {
        private IDataProvider _dataProvider;

        public RegisterService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Insert(UserAddRequest model)
        {
            int retVal = 0;
            _dataProvider.ExecuteNonQuery("dbo.Users_Insert", inputParamMapper: delegate (SqlParameterCollection parms)
            {
                SqlParameter parm = new SqlParameter();
                parm.ParameterName = "@Id";
                parm.SqlDbType = SqlDbType.Int;
                parm.Direction = ParameterDirection.Output;
                parms.Add(parm);

                parms.AddWithValue("@Email", model.Email);
                parms.AddWithValue("@Username", model.Username);
                parms.AddWithValue("@Password", model.Password);

                parms.AddWithValue("@PasswordConfirm", model.PasswordConfirm);
            }, returnParameters: delegate (SqlParameterCollection parms)
            {
                Int32.TryParse(parms["@Id"].Value.ToString(), out retVal);
            });

            return retVal;
        }

        private static User MapUser(IDataReader reader)
        {
            User model = new User();

            int startingIndex = 0;
            model.Id = reader.GetSafeInt32(startingIndex++);
            model.Email = reader.GetSafeString(startingIndex++);
            model.Username = reader.GetSafeString(startingIndex++);
            model.Password = reader.GetSafeString(startingIndex++);
            model.PasswordConfirm = reader.GetSafeString(startingIndex++);

            return model;
        }
    }
}