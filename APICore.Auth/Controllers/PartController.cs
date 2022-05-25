using APICore.Auth.DTO;
using EF.Core.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore.Auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartController : ControllerBase
    {
        private readonly IPartRepository _partRepo;
        private APIResponse _response;

        public PartController(IPartRepository partRepo)
        {
            _partRepo = partRepo;
        }

        [HttpGet]
        [Route("allParts")]
        public IActionResult GetAllParts()
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();

                var allParts = _partRepo.GetAllParts();
                return Ok(allParts);
            }
            catch(Exception ex)
            {
                return BadRequest("Server Error!");                
            }         
        }

        [HttpPost]
        [Route("createPart")]
        public IActionResult CreatePart(Part part)
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();
                _partRepo.AddPart(part);
                _response.ResponseCode = 0;
                _response.ResponseMessage = "Part Added Successfully!";
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
