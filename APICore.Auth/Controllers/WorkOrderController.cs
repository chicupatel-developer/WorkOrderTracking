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

namespace APICore.Auth.Controllers
{

    [Authorize("Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkOrderController : ControllerBase
    {
        private readonly IWorkOrderRepository _woRepo;
        private APIResponse _response;

        public WorkOrderController(IWorkOrderRepository woRepo)
        {
            _woRepo = woRepo;
        }


    }
}

