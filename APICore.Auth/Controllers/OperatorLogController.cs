﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EF.Core.DTO;
using EF.Core.Models;
using Service.Interface;
using APICore.Auth.DTO;
using Microsoft.AspNetCore.Authorization;

namespace APICore.Auth.Controllers
{
    [Authorize("Operator")]
    [Route("api/[controller]")]
    [ApiController]
    public class OperatorLogController : ControllerBase
    {
        private readonly IWorkOrderRepository _wOrderRepo;
        private readonly ICustomerOrderRepository _custOrderRepo;
        private readonly IOperatorLogRepository _oprRepo;
        private readonly IOperationRepository _opRepo;

        private APIResponse _response;

        public OperatorLogController(IOperatorLogRepository oprRepo, IOperationRepository opRepo, ICustomerOrderRepository custOrderRepo, IWorkOrderRepository wOrderRepo)
        {
            _custOrderRepo = custOrderRepo;
            _wOrderRepo = wOrderRepo;
            _opRepo = opRepo;
            _oprRepo = oprRepo;
        }

        [HttpGet]
        [Route("getWorkOrderList")]
        public IActionResult GetWorkOrderList()
        {
            try
            {
                // throw new Exception();

                var workOrders = _oprRepo.GetWorkOrderList();
                return Ok(workOrders);
            }
            catch (Exception ex)
            {
                return BadRequest("Server Error!");
            }
        }

        [HttpGet]
        [Route("getOperationList/{selectedWoId}")]
        public IActionResult GetOperationList(int selectedWoId)
        {
            try
            {
                // throw new Exception();

                var ops = _oprRepo.GetOperationList(selectedWoId).ToList();
                return Ok(ops);
            }
            catch (Exception ex)
            {
                return BadRequest("Server Error!");
            }           
        }

        [HttpGet]
        [Route("getOperationQtyData/{selectedOpId}")]
        public IActionResult GetOperationQtyData(int selectedOpId)
        {
            try
            {
                // throw new Exception();

                var opQtyData = _oprRepo.GetOperationQtyData(selectedOpId);
                return Ok(opQtyData);
            }
            catch (Exception ex)
            {
                return BadRequest("Server Error!");
            }
        }

        [HttpPost]
        [Route("createOperatorLog")]
        public IActionResult CreateOperatorLog(OperatorActivity operatorActivity)
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();
                                
                if (operatorActivity != null)
                    operatorActivity.OperatorId = _oprRepo.GetOperator(operatorActivity.UserId).OperatorId;

                if (operatorActivity.OperatorId < 1)
                    throw new Invalid_Operator_Exception("Invalid Operator !");
                               

                if (ModelState.IsValid)
                {                    
                    if (operatorActivity.OperationStatus == OperationStatusForOperator.Start_Running && operatorActivity.OpStartRunTime == null)
                    {
                        ModelState.AddModelError("OpStartRunTime", "Operation Start Run Time Is Empty !");
                        return BadRequest(ModelState);
                    }
                    if (operatorActivity.OperationStatus == OperationStatusForOperator.Pause_Running && (operatorActivity.OpPauseRunTime == null || operatorActivity.OpQtyDone == null))
                    {
                        if (operatorActivity.OpPauseRunTime == null)
                            ModelState.AddModelError("OpPauseRunTime", "Operation Pause Run Time Is Empty !");

                        if (operatorActivity.OpQtyDone == null)
                            ModelState.AddModelError("OpQtyDone", "Operation Qty Done Is Empty !");

                        return BadRequest(ModelState);
                    }

                    _oprRepo.AddOperatorLog(operatorActivity);
                    _response.ResponseCode = 0;
                    _response.ResponseMessage = "Operator-Log is Created !";
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Operator_CanNot_StartRun_OP_Exception ocnsropEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = ocnsropEx.Message;
            }
            catch (Invalid_Operator_Exception ioEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = ioEx.Message;
            }
            catch (Invalid_Operator_Action_Exception ioaEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = ioaEx.Message;
            }
            catch (Invalid_Operator_LogData_Exception ioldEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = ioldEx.Message;
            }
            catch (Exception ex)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = "Server Error!";
            }
            return Ok(_response);
        }


        [HttpPost]
        [Route("getMyLogData")]
        public IActionResult GetMyLogData(OperatorLogDataView myLogData)
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();

                var myLog = _oprRepo.GetMyLogData(myLogData);
                _response.ResponseCode = 0;
                _response.ResponseMessage = "Operator-Log Data Is Ready !";
                return Ok(new { response = _response, logData = myLog });
            }
            catch (Exception ex)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = "Server Error !";
                // return Ok(_response);
                return Ok(new { response = _response });
            }
            
        }
    }
}
