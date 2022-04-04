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

        [HttpGet]
        public ActionResult<DataTableResponse> GetAllCustomerOrders()
        {
            var custOrders = _custOrderRepo.GetAllCustomerOrders();

            return new DataTableResponse
            {
                RecordsTotal = custOrders.Count(),
                RecordsFiltered = 10,
                Data = custOrders.ToArray()
            };
        }


        // remote validation
        [AcceptVerbs("GET", "POST")]
        public IActionResult VerifyOrderDate(DateTime orderDate)
        {
            if (!(orderDate.Date >= DateTime.Now.Date))
            {
                return Json($"Order-Date Must Be >= Current-Date !");
            }
            return Json(true);
        }

        // remote validation
        [AcceptVerbs("GET", "POST")]
        public IActionResult VerifyOrderDueDate(DateTime orderDate, DateTime orderDueDate)
        {
            if (orderDueDate.Date < orderDate.Date)
            {
                return Json($"Order-Due-Date Must Be >= Order-Date !");
            }
            return Json(true);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        // public JsonResult Create([FromBody] CustomerOrder customerOrder)
        public JsonResult Create(CustomerOrder customerOrder)
        {
            OperationResult retData = new OperationResult();

            if (ModelState.IsValid)
            {
                retData = DateCheck(customerOrder);
                if (retData.StatusCode == 0)
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

        private OperationResult DateCheck(CustomerOrder customerOrder)
        {
            OperationResult retData = new OperationResult();
            retData.StatusCode = 0;

            if (customerOrder.OrderDueDate < customerOrder.OrderDate)
            {
                ModelState.AddModelError("OrderDueDate", "Order-Due-Date Must be >= Order-Date !");
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
            if (customerOrder.OrderDate < DateTime.Now.Date)
            {
                ModelState.AddModelError("OrderDate", "Order-Date Must be >= Current-Date !");
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
            return retData;
        }


        public ActionResult Edit(int id)
        {
            var co = _custOrderRepo.GetCustomerOrder(id);
            return PartialView("_Edit", co);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Edit(CustomerOrder customerOrder)
        {
            OperationResult retData = new OperationResult();

            if (ModelState.IsValid)
            {
                retData = DateCheck(customerOrder);
                if (retData.StatusCode == 0)
                {
                    if (_custOrderRepo.EditCustomerOrder(customerOrder))
                    {
                        retData.Message = "Customer Order is Edited !";
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
