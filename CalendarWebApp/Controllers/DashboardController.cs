using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CalendarWebApp.Repository;
using CalendarWebApp.Models;
using System.Security.Principal;
using Microsoft.AspNetCore.Authorization;
//using TCWeb.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CalendarWebApp.Controllers
{
	public class DashboardController : Controller
	{
		// GET: /<controller>/
		public IActionResult Index()
		{
			return View();
		}

		[HttpGet]
		[Route("/Dashboard/Vacances")]
		public async Task<ActionResult> Vacances(int year)
		{

			var yearCalendar = new List<YearCalendar> { };
			try
			{
				DashboardRepository DashboardRepository = new DashboardRepository();
				yearCalendar = await DashboardRepository.Vacances(year);
			}
			catch
			{

			}

			return Json(yearCalendar);
		}
	}
}
