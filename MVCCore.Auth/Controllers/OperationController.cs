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
    [Authorize("Admin")]
    public class OperationController : Controller
    {
        private readonly ILogger<OperationController> _logger;
        private readonly IWorkOrderRepository _wOrderRepo;
        private readonly ICustomerOrderRepository _custOrderRepo;
        private readonly IPartRepository _partRepo;
        private readonly IOperationRepository _opRepo;

        public OperationController(IPartRepository partRepo, IOperationRepository opRepo, ICustomerOrderRepository custOrderRepo, IWorkOrderRepository wOrderRepo  ,ILogger<OperationController> logger)
        {
            _custOrderRepo = custOrderRepo;
            _wOrderRepo = wOrderRepo;
            _opRepo = opRepo;
            _partRepo = partRepo;
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
                // check for exception
                // throw new Exception();

                // check for modelstate errors
                // ModelState.AddModelError("OperationNumber", "Operation Number Is Invalid !");

                if (ModelState.IsValid)
                {
                    _opRepo.AddOperation(operation);

                    retData.Message = "Operation is Connected with Work-Order # " + operation.WorkOrderId + " !";
                    retData.ModelErrors = new List<string>();
                    retData.StatusCode = 0;
                    retData.OtherIntData = (int)operation.WorkOrderId;                    
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
            catch (WO_OP_Unique_Exception woopUEx)
            {
                retData.Message = woopUEx.Message;
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

        public ActionResult Edit(int id)
        {
            var op = _opRepo.GetOperation(id);
            return PartialView("_Edit", op);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Edit(Operation operation)
        {
            OperationResult retData = new OperationResult();

            try
            {
                // check for exception
                // throw new Exception();

                // check for modelstate errors
                // ModelState.AddModelError("OperationStartDate", "Operation Start Date Is Invalid !");

                if (ModelState.IsValid)
                {
                    _opRepo.EditOperation(operation);

                    retData.Message = "Operation is Edited !";
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
            }
            catch (OP_CanNot_Completed_Exception ocncEx)
            {
                retData.Message = ocncEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (Invalid_OP_Status_Exception iopsEx)
            {
                retData.Message = iopsEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (Invalid_OP_StartDate_Exception iopsdEx)
            {
                retData.Message = iopsdEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (OP_CanNot_Not_Started_Exception opcnnsEx)
            {
                retData.Message = opcnnsEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (OP_CanNot_Start_Running_Exception opcnsrEx)
            {
                retData.Message = opcnsrEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (OpStatus_OpStartDate_Exception opEx)
            {
                retData.Message = opEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (Record_Not_Found_Exception rnfEx)
            {
                retData.Message = rnfEx.Message;
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

        [HttpGet]
        public IActionResult XferPartsForOperation(int id)
        {
            var parts = _partRepo.GetPartList();
            ViewBag.Parts = parts;

            var xferInfo = _opRepo.GetOperationDetails(id);
            ViewBag.CustomerOrderId = xferInfo.CustomerOrderId;
            ViewBag.CustomerName = xferInfo.CustomerName;
            ViewBag.CustomerOrderQTY = xferInfo.CustomerOrderQTY;
            ViewBag.WorkOrderId = xferInfo.WorkOrderId;
            ViewBag.OperationNumber = xferInfo.OperationNumber;

            OperationToPart model = new OperationToPart()
            { 
                 OperationId =  id
            };

            return PartialView("_XferPartsForOperation", model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult XferPartsForOperation(OperationToPart operationToPart)
        {
            OperationResult retData = new OperationResult();

            try
            {
                if (ModelState.IsValid)
                {
                    _opRepo.XferPartsForOperation(operationToPart);

                    retData.Message = "Parts Xfer Completed !";
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
            }
            catch (Not_Enough_QTY_Exception neqEx)
            {
                retData.Message = neqEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (Record_Not_Found_Exception rnfEx)
            {
                retData.Message = rnfEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (OP_Part_Unique_Exception dupPrtEx)
            {
                retData.Message = dupPrtEx.Message;
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

        // get
        // operation log from operationid
        public ActionResult GetOperationLogData(int id)
        {
            var operationLog = _opRepo.GetOperationLogData(id);
            return PartialView("_GetOperationLogData", operationLog);
        }
    }
}
