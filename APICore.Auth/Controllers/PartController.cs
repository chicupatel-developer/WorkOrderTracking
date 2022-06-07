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

namespace APICore.Auth.Controllers
{

    [Authorize("Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class PartController : ControllerBase
    {
        // file upload location settings from appsettings.json
        private readonly IConfiguration _configuration;

        private readonly IPartRepository _partRepo;
        private APIResponse _response;

        public PartController(IConfiguration configuration, IPartRepository partRepo)
        {
            _configuration = configuration;
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
            catch (Exception ex)
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

                if (ModelState.IsValid)
                {
                    _partRepo.AddPart(part);
                    _response.ResponseCode = 0;
                    _response.ResponseMessage = "Part Added Successfully!";
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
        [Route("getPart/{selectedPartId}")]
        public IActionResult GetPart(int selectedPartId)
        {
            var part = _partRepo.GetPart(selectedPartId);
            return Ok(part);
        }
        [HttpPost]
        [Route("editPart")]
        public IActionResult EditPart(Part part)
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();
                if (ModelState.IsValid)
                {
                    _partRepo.EditPart(part);
                    _response.ResponseCode = 0;
                    _response.ResponseMessage = "Part Edited Successfully!";
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
        [Route("removePart")]
        public IActionResult RemovePart(Part part)
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();
                _partRepo.DeletePart(part.PartId);
                _response.ResponseCode = 0;
                _response.ResponseMessage = "Part Removed Successfully!";
            }
            catch (Exception ex)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = "Server Error!";
            }
            return Ok(_response);
        }


        [HttpPost, DisableRequestSizeLimit]
        [Route("partImageUpload")]
        public async Task<ActionResult> PartImageUpload([FromForm] PartFileUploadData imgUpModel)
        // public ActionResult PartImageUpload([FromForm] PartFileUploadData imgUpModel)
        {
            try
            {
                // throw new Exception();

                if (ModelState.IsValid)
                {
                    var formFile = imgUpModel.PartImage;
                    int partId = Convert.ToInt32(imgUpModel.PartId);

                    string partImageStoragePath = _configuration.GetSection("PartImageLocation").GetSection("Path").Value;

                    var fileName = DateTime.Now.Year + "-" + DateTime.Now.Month + "-" + DateTime.Now.Day + "-" + DateTime.Now.Hour + "-" + DateTime.Now.Minute + "-" + ContentDispositionHeaderValue.Parse(formFile.ContentDisposition)
                          .FileName.Trim('"');

                    var finalPath = Path.Combine(partImageStoragePath, fileName);

                    using var stream = new FileStream(finalPath, FileMode.Create);

                    await formFile.CopyToAsync(stream);
                    // formFile.CopyTo(stream);

                    _partRepo.UpdatePartFile(partId, fileName);

                    return Ok(new { status = "success", message = "Part - File Upload Success !", fileName = formFile.FileName, fileSize = formFile.Length });
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                // return BadRequest(new { status = "fail", message = "Server Error ! File Can Not Upload At This Time !" });
                return StatusCode(StatusCodes.Status500InternalServerError, new { status = "fail", message = "Server Error ! File Can Not Upload At This Time !" });
            }
        }
    }
}

