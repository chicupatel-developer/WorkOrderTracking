using EF.Core.DTO;
using EF.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MVCCore.Auth.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections;

namespace MVCCore.Auth.Controllers
{
    // [Authorize]
    [Authorize("Admin")]
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
            try
            {
                // throw new Exception();

                var custOrders = _custOrderRepo.GetAllCustomerOrders();

                return new DataTableResponse
                {
                    RecordsTotal = custOrders.Count(),
                    RecordsFiltered = 10,
                    Data = custOrders.ToArray()
                };
            }
            catch(Exception ex)
            {
                var custOrders = new List<CustomerOrder>();

                return new DataTableResponse
                {
                    RecordsTotal = 0,
                    RecordsFiltered = 10,
                    Data = custOrders.ToArray()
                };
            }         
        }


        // remote validation
        /*
        [AcceptVerbs("GET", "POST")]
        public IActionResult VerifyOrderDate(DateTime orderDate)
        {
            if (!(orderDate.Date >= DateTime.Now.Date))
            {
                return Json($"Order-Date Must Be >= Current-Date !");
            }
            return Json(true);
        }
        */

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
            try
            {
                // throw new Exception();

                if (ModelState.IsValid)
                {
                    retData = DateCheck(customerOrder);
                    if (retData.StatusCode == 0)
                    {
                        _custOrderRepo.AddCustomerOrder(customerOrder);

                        retData.Message = "Customer Order is Created !";
                        retData.ModelErrors = new List<string>();
                        retData.StatusCode = 0;
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
            }
            catch(Exception ex)
            {
                retData.Message = "Server Error !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
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
            /*
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
            */
            return retData;
        }


        public ActionResult Edit(int id)
        {
            try
            {
                // throw new Exception();

                var co = _custOrderRepo.GetCustomerOrder(id);
                return PartialView("_Edit", co);
            }
            catch(Exception ex)
            {
                return PartialView("_Edit", null);
            }          
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Edit(CustomerOrder customerOrder)
        {
            OperationResult retData = new OperationResult();
            try
            {
                // throw new Exception();

                if (ModelState.IsValid)
                {
                    retData = DateCheck(customerOrder);
                    if (retData.StatusCode == 0)
                    {
                        _custOrderRepo.EditCustomerOrder(customerOrder);

                        retData.Message = "Customer Order is Edited !";
                        retData.ModelErrors = new List<string>();
                        retData.StatusCode = 0;                   
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
            }
            catch(Record_Not_Found_Exception rnfEx)
            {
                retData.Message = rnfEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch(Exception ex)
            {
                retData.Message = "Server Error !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }       
            return Json(new { Result = retData });
        }

        [HttpGet]
        public ActionResult GetCustomerOrderForDelete(int id)
        {
            try
            {
                // throw new Exception();

                var co = _custOrderRepo.GetCustomerOrder(id);
                return PartialView("_Delete", co);
            }
            catch(Exception ex)
            {
                return PartialView("_Delete", null);
            }       
        }
        [HttpPost]
        public JsonResult Delete(CustomerOrder customerOrder)
        {
            OperationResult retData = new OperationResult();
            try
            {
                _custOrderRepo.DeleteCustomerOrder(customerOrder.CustomerOrderId);

                retData.Message = "Customer Order is Deleted !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = 0;
            }
            catch(Exception ex)
            {
                retData.Message = "Server Error !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }         
            return Json(new { Result = retData });
        }


        [HttpGet]
        public ActionResult GetCustomerOrderProgressReport(int id)
        {
            try
            {
                throw new Exception();

                var coprd = _custOrderRepo.GetCustomerOrderProgressReport(id);
                ViewBag.SelectedCustomerOrderId = id;
                return View("CustomerOrderProgressReport", coprd);
            }
            catch(Exception ex)
            {                
                ViewBag.SelectedCustomerOrderId = id;
                return View("CustomerOrderProgressReport", null);
            }           
        }

        public JsonResult GetCustomerOrderProgressChart(int id)
        {
            try
            {
                // throw new Exception();

                var list = _custOrderRepo.GetCustomerOrderProgressChart(id);
                return Json(new { chartData = list });
            }
            catch(Exception ex)
            {
                var list = new List<CustomerOrderProgressChartData>();
                return Json(new { chartData = list });
            }
         
        }
    }
}
