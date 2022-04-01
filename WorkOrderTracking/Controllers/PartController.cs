using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WorkOrderTracking.Models;
using EF.Core.Models;
using Service.Interface;

namespace WorkOrderTracking.Controllers
{
    public class PartController : Controller
    {
        private readonly ILogger<PartController> _logger;
        private readonly IPartRepository _partRepo;

        public PartController(IPartRepository partRepo, ILogger<PartController> logger)
        {
            _partRepo = partRepo;
            _logger = logger;
        }     

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult<DataTableResponse> GetAllParts()
        {
            var custOrders = _partRepo.GetAllParts();

            return new DataTableResponse
            {
                RecordsTotal = custOrders.Count(),
                RecordsFiltered = 10,
                Data = custOrders.ToArray()
            };
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
                retData.Message = "Part is Created !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = 0;
            }
            else
            {
                retData.Message = "Model is NOT Valid !";
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
    
    
    
        public ActionResult Edit()  
        {
            int id = 1;
            var part = _partRepo.GetPart(id);           
            return PartialView("_Edit", part);    
        }
        [HttpPost]
        // [ValidateAntiForgeryToken]
        public JsonResult Edit(Part model)
        {
            OperationResult retData = new OperationResult();

            if (ModelState.IsValid)
            {
                retData.Message = "Part is Edited !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = 0;
            }
            else
            {
                retData.Message = "Model is NOT Valid !";
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
