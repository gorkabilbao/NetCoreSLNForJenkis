using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CalendarWebApp.Models
{
	public class YearCalendar
	{
		[Display(Name = "id")]
		[Column("id")]
		public int id { get; set; }

		[Display(Name = "Name")]
		[Column("project_number")]
		public string Name { get; set; }

		[Display(Name = "plantid")]
		[Column("plantid")]
		public int plantid { get; set; }

		[Display(Name = "Location")]
		[Column("Plant_name")]
		public string Location { get; set; }

		[Display(Name = "StartDate")]
		[Column("file_date")]
		public MyDate StartDate { get; set; }

		[Display(Name = "EndDate")]
		[Column("file_date")]
		public MyDate EndDate { get; set; }
	}

	public class MyDate
	{
		[Display(Name = "Year")]
		[Column("Year")]
		public int Year { get; set; }

		[Display(Name = "Month")]
		[Column("Month")]
		public int Month { get; set; }

		[Display(Name = "Day")]
		[Column("day")]
		public int Day { get; set; }
	}
}