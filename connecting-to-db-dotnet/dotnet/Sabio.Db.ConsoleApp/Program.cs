using System;
using System.Data.SqlClient;

namespace Sabio.Db.ConsoleApp
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            //Read the Readme in this same folder. This connection string should work if you use the Init Sql Scripts. 
            string connString = "Server=localhost;Database=Sabio01;User Id=SabioUser;Password=Sabiopass1!";

            bool isConnected = IsServerConnected(connString);
            Console.WriteLine("DB isConnected = {0} ", isConnected);
            Console.ReadLine();
        }

        private static bool IsServerConnected(string connectionString)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    return true;
                }
                catch (SqlException ex)
                {
                    Console.BackgroundColor = ConsoleColor.Yellow;
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine(ex.Message);

                    Console.ResetColor();
                    return false;
                }
            }
        }
    }
}