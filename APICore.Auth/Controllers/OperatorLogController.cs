using Microsoft.AspNetCore.Http;
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



    }
}
