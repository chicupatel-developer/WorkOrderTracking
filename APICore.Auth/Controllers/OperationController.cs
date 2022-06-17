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
        private APIResponse _response;

        public OperationController(IOperationRepository opRepo, IWorkOrderRepository woRepo)
        {
            _opRepo = opRepo;
            _woRepo = woRepo;
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

    }
}
