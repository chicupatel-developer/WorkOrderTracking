using APICore.Auth.DTO;
using EF.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using EF.Core.DTO;


namespace APICore.Auth.Controllers
{
    [Authorize("Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class OperationController : ControllerBase
    {
        private readonly IOperationRepository _opRepo;
        private readonly IWorkOrderRepository _woRepo;
        private readonly IPartRepository _partRepo;
        private APIResponse _response;

        public OperationController(IPartRepository partRepo, IOperationRepository opRepo, IWorkOrderRepository woRepo)
        {
            _opRepo = opRepo;
            _woRepo = woRepo;
            _partRepo = partRepo;
        }

        [HttpGet]
        [Route("getAllWorkOrderOperations/{selectedWorkOrderId}")]
        public IActionResult GetAllWorkOrderOperations(int selectedWorkOrderId)
        {
            var ops = _opRepo.GetAllWorkOrderOperations(selectedWorkOrderId);
            return Ok(ops);
        }


        [HttpGet]
        [Route("getWorkOrderList")]
        public IActionResult GetWorkOrderList()
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();

                var wos = _opRepo.GetWorkOrderList();
                return Ok(wos);
            }
            catch (Exception ex)
            {
                return BadRequest("Server Error!");
            }
        }


        [HttpPost]
        [Route("createOperation")]
        public IActionResult CreateOperation(Operation op)
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();

                if (ModelState.IsValid)
                {
                    _opRepo.AddOperation(op);
                    _response.ResponseCode = 0;
                    _response.ResponseMessage = "Operation is Connected with Work-Order # " + op.WorkOrderId + " !";
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (WO_OP_Unique_Exception woopUEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = woopUEx.Message;
            }
            catch (Exception ex)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = "Server Error!";
            }
            return Ok(_response);
        }


        [HttpGet]
        [Route("getOperation/{selectedOpId}")]
        public IActionResult GetOperation(int selectedOpId)
        {
            var op = _opRepo.GetOperation(selectedOpId);
            return Ok(op);
        }
        [HttpPost]
        [Route("editOperation")]
        public IActionResult EditOperation(Operation op)
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();
                if (ModelState.IsValid)
                {   
                    _opRepo.EditOperation(op);
                    _response.ResponseCode = 0;
                    _response.ResponseMessage = "Operation Edited Successfully!";
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (OP_CanNot_Completed_Exception ocncEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = ocncEx.Message;
            }
            catch (Invalid_OP_Status_Exception iopsEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = iopsEx.Message;
            }
            catch (Invalid_OP_StartDate_Exception iopsdEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = iopsdEx.Message;
            }
            catch (OP_CanNot_Not_Started_Exception opcnnsEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = opcnnsEx.Message;
            }
            catch (OP_CanNot_Start_Running_Exception opcnsrEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = opcnsrEx.Message;
            }
            catch (OpStatus_OpStartDate_Exception opEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = opEx.Message;
            }
            catch (Record_Not_Found_Exception rnfEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = rnfEx.Message;
            }         
            catch (Exception ex)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = "Server Error!";
            }
            return Ok(_response);
        }

        // xfer parts
        [HttpGet]
        [Route("getPartList")]
        public IActionResult GetPartList()
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();

                var parts = _partRepo.GetPartList();
                return Ok(parts);
            }
            catch (Exception ex)
            {
                return BadRequest("Server Error!");
            }
        }
        [HttpGet]
        [Route("getOperationDetails/{selectedOpId}")]
        public IActionResult GetOperationDetails(int selectedOpId)
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();

                var xferInfo = _opRepo.GetOperationDetails(selectedOpId);
                return Ok(xferInfo);
            }
            catch (Exception ex)
            {
                return BadRequest("Server Error!");
            }         
        }
        [HttpPost]
        [Route("xferPartsForOperation")]
        public IActionResult XferPartsForOperation(OperationToPart opToPart)
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();

                if (ModelState.IsValid)
                {
                    _opRepo.XferPartsForOperation(opToPart);
                    _response.ResponseCode = 0;
                    _response.ResponseMessage = "Parts Xfer Completed !";
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Not_Enough_QTY_Exception neqEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = neqEx.Message;
            }
            catch (Record_Not_Found_Exception rnfEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = rnfEx.Message;
            }
            catch (OP_Part_Unique_Exception dupPrtEx)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = dupPrtEx.Message;
            }
            catch (Exception ex)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = "Server Error!";
            }
            return Ok(_response);
        }


        [HttpGet]
        [Route("getOperationLogData/{selectedOpId}")]
        public IActionResult GetOperationLogData(int selectedOpId)
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();

                var operationLog = _opRepo.GetOperationLogData(selectedOpId);
                return Ok(operationLog);
            }
            catch (Exception ex)
            {
                return BadRequest("Server Error!");
            }
        }


    }
}
