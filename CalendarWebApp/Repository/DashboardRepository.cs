using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using CalendarWebApp.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
//using Novell.Directory.Ldap;
using System.Security.Principal;

namespace CalendarWebApp.Repository
{
	public class DashboardRepository
	{
		private SqlConnection con;

		//To Handle connection related activities    
		private void connection()
		{
			string constr = "Server=tcp:AUB-TC.es.gestamp.com;Database=TCTOLDB_v3;Trusted_Connection=True;";
			con = new SqlConnection(constr);
		}

		//To view user with generic list     
		public async Task<List<YearCalendar>> Vacances(int year)
		{

			List<YearCalendar> YearCalendar = new List<YearCalendar>();

			try
			{

				//System.Diagnostics.Debugger.Break();

				//Mikael Methodology
				//connection();
				//SqlCommand com = new SqlCommand("SELECT ROW_NUMBER() OVER(ORDER BY  DATEPART(year,[file_date]),  DATEPART(month,[file_date]), DATEPART(day,[file_date]) ASC) AS id, CAST([project_numer] AS VARCHAR(20))+ ': ' + CAST(COUNT(*) AS VARCHAR(20)) + ' files' as Name, [Plant_name], DATEPART(year, file_date) AS 'Year', DATEPART(month, file_date) - 1 AS 'Month', DATEPART(day, file_date) AS 'Day', COUNT(*) AS 'Count' FROM [dbo].[Data_SET_Web_app_Full_Calendar] ('" + year.ToString() + "-1-1','" + year.ToString() + "-12-31') GROUP BY  DATEPART(DAY, file_date), DATEPART(year,[file_date]), DATEPART(month,[file_date]), DATEPART(day,[file_date]), [project_numer], [Plant_name], [day], DATEPART(year, file_date), DATEPART(month, file_date), DATEPART(day, file_date) ORDER BY Year, Month, Day", con);
				//com.CommandType = CommandType.Text;

				connection();
				SqlCommand com = new SqlCommand(@"[dbo].[sp_WA_Full]", con);
				com.CommandType = CommandType.StoredProcedure;
				com.Parameters.AddWithValue("@year", year);

				con.Open();
				var reader = await com.ExecuteReaderAsync();
				if (reader.HasRows)
				{
					while (reader.Read())
					{
						YearCalendar.Add(
							new YearCalendar
							{
								id = Convert.ToInt32(reader["id"]),
								Name = Convert.ToString(reader["Name"]),
								Location = Convert.ToString(reader["Plant_name"]),
								StartDate = new MyDate
								{
									Year = Convert.ToInt32(reader["Year"]),
									Month = Convert.ToInt32(reader["Month"]),
									Day = Convert.ToInt32(reader["Day"])
								},
								EndDate = new MyDate
								{
									Year = Convert.ToInt32(reader["Year"]),
									Month = Convert.ToInt32(reader["Month"]),
									Day = Convert.ToInt32(reader["Day"])
								}
							}
							);
					}
				}
				con.Close();

			}
			catch (Exception e)
			{

			}

			return YearCalendar;
		}

	}
}
