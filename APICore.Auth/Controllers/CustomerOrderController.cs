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

    // [Authorize("Admin")]
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


        [HttpGet]
        [Route("getCustomerOrder/{selectedCoId}")]
        public IActionResult GetCustomerOrder(int selectedCoId)
        {
            var co = _custOrderRepo.GetCustomerOrder(selectedCoId);
            return Ok(co);
        }
        [HttpPost]
        [Route("editCustomerOrder")]
        public IActionResult EditCustomerOrder(CustomerOrder co)
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

                    _custOrderRepo.EditCustomerOrder(co);
                    _response.ResponseCode = 0;
                    _response.ResponseMessage = "Customer-Order Edited Successfully!";
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


        [HttpPost]
        [Route("removeCustomerOrder")]
        public IActionResult RemoveCustomerOrder(CustomerOrder co)
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();
                _custOrderRepo.DeleteCustomerOrder(co.CustomerOrderId);
                _response.ResponseCode = 0;
                _response.ResponseMessage = "Customer-Order Removed Successfully!";
            }
            catch (Exception ex)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = "Server Error!";
            }
            return Ok(_response);
        }

        [HttpGet]
        [Route("getCustomerOrderProgressTextReport/{selectedCoId}")]
        public IActionResult GetCustomerOrderProgressTextReport(int selectedCoId)
        {
            try
            {
                var coprd = _custOrderRepo.GetCustomerOrderProgressReport(selectedCoId);
                return Ok(coprd);
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getCustomerOrderProgressChartReport/{selectedCoId}")]
        public IActionResult GetCustomerOrderProgressChart(int selectedCoId)
        {
            try
            {
                var coprd = _custOrderRepo.GetCustomerOrderProgressChart(selectedCoId);
                return Ok(coprd);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

    }
}

