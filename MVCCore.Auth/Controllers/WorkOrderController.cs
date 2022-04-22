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

namespace MVCCore.Auth.Controllers
{
    [Authorize]
    public class WorkOrderController : Controller
    {
        private readonly ILogger<WorkOrderController> _logger;
        private readonly IWorkOrderRepository _wOrderRepo;
        private readonly ICustomerOrderRepository _custOrderRepo;

        public WorkOrderController(ICustomerOrderRepository custOrderRepo, IWorkOrderRepository wOrderRepo  ,ILogger<WorkOrderController> logger)
        {
            _custOrderRepo = custOrderRepo;
            _wOrderRepo = wOrderRepo;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult<DataTableResponse> GetAllWorkOrders()
        {
            var wOrders = _wOrderRepo.GetAllWorkOrders();

            return new DataTableResponse
            {
                RecordsTotal = wOrders.Count(),
                RecordsFiltered = 10,
                // Data = wOrders.ToArray()
                Data = wOrders.ToArray()
            };
        }

        [HttpGet]
        public ActionResult GetCustomerOrderDetails(int id)
        {
            var co = _custOrderRepo.GetCustomerOrder(id);
            return PartialView("_CustomerOrderDetails", co);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var customerOrders = _wOrderRepo.GetCustomerOrderList();
            ViewBag.CustomerOrders = customerOrders;
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Create(WorkOrder workOrder)
        {
            OperationResult retData = new OperationResult();

            try
            {
                if (ModelState.IsValid)
                {
                    _wOrderRepo.AddWorkOrder(workOrder);

                    retData.Message = "Work Order is Created !";
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
            catch(Exception ex)
            {
                retData.Message = "Server Error !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }         
            return Json(new { Result = retData });
        }

        public ActionResult Edit(int id)
        {
            var wo = _wOrderRepo.GetWorkOrder(id);
            return PartialView("_Edit", wo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Edit(WorkOrder workOrder)
        {
            OperationResult retData = new OperationResult();

            try
            {
                if (ModelState.IsValid)
                {
                    _wOrderRepo.EditWorkOrder(workOrder);

                    retData.Message = "Work Order is Edited !";
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
            catch (Invalid_WO_Status_Exception iwosEx)
            {
                retData.Message = iwosEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (Invalid_OP_StartDate_Exception iopsdEx)
            {
                retData.Message = iopsdEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (WO_CanNot_Not_Started_Exception wocnnsEx)
            {
                retData.Message = wocnnsEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (WoStatus_WoStartDate_Exception opEx)
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
        public ActionResult GetWorkOrderForDelete(int id)
        {
            var co = _wOrderRepo.GetWorkOrder(id);
            return PartialView("_Delete", co);
        }
        [HttpPost]
        public JsonResult Delete(WorkOrder workOrder)
        {
            OperationResult retData = new OperationResult();

            try
            {
                _wOrderRepo.DeleteWorkOrder(workOrder.WorkOrderId);
                
                retData.Message = "Work Order is Deleted !";
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
    }
}
