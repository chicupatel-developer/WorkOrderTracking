using EF.Core.DTO;
using EF.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MVCCore.Auth.Models;
using Microsoft.AspNetCore.Authorization;

namespace MVCCore.Auth.Controllers
{
    [Authorize("Operator")]
    public class OperatorLogController : Controller
    {
        private readonly ILogger<OperationController> _logger;
        private readonly IWorkOrderRepository _wOrderRepo;
        private readonly ICustomerOrderRepository _custOrderRepo;
        private readonly IOperatorLogRepository _oprRepo;
        private readonly IOperationRepository _opRepo;

        public OperatorLogController(IOperatorLogRepository oprRepo, IOperationRepository opRepo, ICustomerOrderRepository custOrderRepo, IWorkOrderRepository wOrderRepo  ,ILogger<OperationController> logger)
        {
            _custOrderRepo = custOrderRepo;
            _wOrderRepo = wOrderRepo;
            _opRepo = opRepo;
            _oprRepo = oprRepo;
            _logger = logger;
        }

        public IActionResult Index()
        {
            var workOrders = _oprRepo.GetWorkOrderList();
            ViewBag.WorkOrders = workOrders;

            return View();
        }

        [HttpGet]
        public JsonResult GetOperations(int id)
        {            
            return Json(_oprRepo.GetOperationList(id).ToList());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Create(OperatorActivity operatorActivity)
        {
            OperationResult retData = new OperationResult();

            try
            {
                if (operatorActivity != null)
                    operatorActivity.OperatorId = _oprRepo.GetOperator(operatorActivity.UserId).OperatorId;
                

                if (ModelState.IsValid)
                {
                    retData = DateAndQtyCheck(operatorActivity);
                    if (retData.StatusCode == 0)
                    {
                        _oprRepo.AddOperatorLog(operatorActivity);

                        retData.Message = "Operator-Log is Created !";
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
            catch (Invalid_Operator_Action_Exception ioaEx)
            {
                retData.Message = ioaEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (Invalid_Operator_LogData_Exception ioldEx)
            {
                retData.Message = ioldEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (Exception ex)
            {
                retData.Message = "Server Error !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            return Json(new { Result = retData });
        }
        private OperationResult DateAndQtyCheck(OperatorActivity operatorActivity)
        {
            OperationResult retData = new OperationResult();
            retData.StatusCode = 0;

            if (operatorActivity.OperationStatus == OperationStatusForOperator.Start_Running && operatorActivity.OpStartRunTime==null)
            {
                ModelState.AddModelError("OpStartRunTime", "Operation Start Run Time Is Empty !");
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
            if (operatorActivity.OperationStatus == OperationStatusForOperator.Pause_Running && (operatorActivity.OpPauseRunTime == null || operatorActivity.OpQtyDone == null))
            {
                if(operatorActivity.OpPauseRunTime==null)
                    ModelState.AddModelError("OpPauseRunTime", "Operation Pause Run Time Is Empty !");

                if (operatorActivity.OpQtyDone == null)
                    ModelState.AddModelError("OpQtyDone", "Operation Qty Done Is Empty !");

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
    }
}
