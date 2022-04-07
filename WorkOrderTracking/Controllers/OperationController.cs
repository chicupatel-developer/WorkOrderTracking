using EF.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkOrderTracking.Models;

namespace WorkOrderTracking.Controllers
{
    public class OperationController : Controller
    {
        private readonly ILogger<OperationController> _logger;
        private readonly IWorkOrderRepository _wOrderRepo;
        private readonly ICustomerOrderRepository _custOrderRepo;
        private readonly IOperationRepository _opRepo;

        public OperationController(IOperationRepository opRepo, ICustomerOrderRepository custOrderRepo, IWorkOrderRepository wOrderRepo  ,ILogger<OperationController> logger)
        {
            _custOrderRepo = custOrderRepo;
            _wOrderRepo = wOrderRepo;
            _opRepo = opRepo;
            _logger = logger;
        }

        public IActionResult Index(int id)
        {
            var ops = _opRepo.GetAllWorkOrderOperations(id);
            ViewBag.SelectedWorkOrderId = id;

            var customer = _wOrderRepo.GetCustomerName(id);
            ViewBag.Customer = customer;

            return View(ops);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var workOrders = _opRepo.GetWorkOrderList();
            ViewBag.WorkOrders = workOrders;
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Create(Operation operation)
        {
            OperationResult retData = new OperationResult();

            try
            {
                if (ModelState.IsValid)
                {
                    if (_opRepo.AddOperation(operation))
                    {
                        retData.Message = "Operation is Connected with Work-Order # " + operation.WorkOrderId + " !";
                        retData.ModelErrors = new List<string>();
                        retData.StatusCode = 0;
                        retData.OtherIntData = (int)operation.WorkOrderId;
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
            }         
            catch(Exception ex)
            {
                retData.Message = "Server Error !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }         
            return Json(new { Result = retData });
        }


    }
}
