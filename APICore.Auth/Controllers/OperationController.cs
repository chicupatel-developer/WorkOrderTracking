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

    }
}
