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
    public class CustomerOrderController : ControllerBase
    // public class CustomerOrderController : Controller
    {
        // file upload location settings from appsettings.json
        private readonly IConfiguration _configuration;

        private readonly ICustomerOrderRepository _custOrderRepo;
        private APIResponse _response;

        public CustomerOrderController(IConfiguration configuration, ICustomerOrderRepository custOrderRepo)
        {
            _configuration = configuration;
            _custOrderRepo = custOrderRepo;
        }

        [HttpGet]
        [Route("allCustomerOrders")]
        public IActionResult GetAllCustomerOrders()
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();

                var custOrders = _custOrderRepo.GetAllCustomerOrders();
                return Ok(custOrders);
            }
            catch (Exception ex)
            {
                return BadRequest("Server Error!");
            }
        }
               
        [HttpPost]
        [Route("createCustomerOrder")]
        public IActionResult CreateCustomerOrder(CustomerOrder co)
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();

                if (ModelState.IsValid)
                {                    
                    if (co.OrderDueDate < co.OrderDate)
                    {
                        ModelState.AddModelError("OrderDueDate", "Order-Due-Date Must be >= Order-Date !");
                        return BadRequest(ModelState);
                    }                
                 
                    _custOrderRepo.AddCustomerOrder(co);
                    _response.ResponseCode = 0;
                    _response.ResponseMessage = "Customer-Order Added Successfully!";
                }
                else
                {
                    return BadRequest(ModelState);
                }
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

