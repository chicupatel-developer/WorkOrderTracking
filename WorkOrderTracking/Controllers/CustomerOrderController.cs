using EF.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkOrderTracking.Models;

namespace WorkOrderTracking.Controllers
{
    public class CustomerOrderController : Controller
    {
        private readonly ILogger<CustomerOrderController> _logger;
        private readonly ICustomerOrderRepository _custOrderRepo;

        public CustomerOrderController(ICustomerOrderRepository custOrderRepo  ,ILogger<CustomerOrderController> logger)
        {
            _custOrderRepo = custOrderRepo;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }


        [AcceptVerbs("GET", "POST")]
        public IActionResult VerifyDate(DateTime orderDate, DateTime orderDueDate)
        {
            if (!(orderDate<orderDueDate))
            {
                return Json($"Invalid Date Entry !");
            }
            return Json(true);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Create([FromBody] CustomerOrder customerOrder)
        {
            OperationResult retData = new OperationResult();

            if (ModelState.IsValid)
            {
                if (_custOrderRepo.AddCustomerOrder(customerOrder))
                {
                    retData.Message = "Customer Order is Created !";
                    retData.ModelErrors = new List<string>();
                    retData.StatusCode = 0;
                }
                else
                {
                    retData.Message = "Server Error !";
                    retData.ModelErrors = new List<string>();
                    retData.StatusCode = -1;
                }              
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
