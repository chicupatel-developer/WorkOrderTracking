using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WorkOrderTracking.Models;
using EF.Core.Models;

namespace WorkOrderTracking.Controllers
{
    public class PartController : Controller
    {
        private readonly ILogger<PartController> _logger;

        public PartController(ILogger<PartController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult<DataTableResponse> GetParts()
        {
            var parts = getAllParts().ToList();

            return new DataTableResponse
            {
                RecordsTotal = parts.Count(),
                RecordsFiltered = 10,
                Data = parts.ToArray()
            };
        }

        private IEnumerable<Part> getAllParts()
        {
            List<Part> datas = new List<Part>();
            for (int i = 1; i <= 100; i++)
            {
                datas.Add(new Part()
                {
                    PartId = i,
                    Name = "Name - " + i,
                    Desc = "Desc - " + i,
                });
            }
            return datas.ToList();
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Create([FromBody] Part part)
        {
            OperationResult retData = new OperationResult();

            if (ModelState.IsValid)
            {
                retData.Message = "Part is Created";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = 0;
            }
            else
            {
                retData.Message = "Model is NOT Valid";
                retData.StatusCode = 1;
                retData.ModelErrors = new List<string>();
                foreach (var modelState in ViewData.ModelState.Values)
                {
                    foreach (var error in modelState.Errors)
                    {
                        string mError = error.ErrorMessage.ToString();
                        retData.ModelErrors.Add(mError);
                    }
                }
            }
            return Json(new { Result = retData });
        }
    }
}
