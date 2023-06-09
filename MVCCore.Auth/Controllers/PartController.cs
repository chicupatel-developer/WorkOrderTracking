﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using MVCCore.Auth.Models;
using EF.Core.Models;
using Service.Interface;
using EF.Core.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;

namespace MVCCore.Auth.Controllers
{
    [Authorize("Admin")]
    public class PartController : Controller
    {
        private readonly ILogger<PartController> _logger;
        private readonly IPartRepository _partRepo;
        private IHostingEnvironment Environment;


        public PartController(IHostingEnvironment _environment, IPartRepository partRepo, ILogger<PartController> logger)
        {
            _partRepo = partRepo;
            _logger = logger;
            Environment = _environment;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult<DataTableResponse> GetAllParts()
        {
            try
            {
                // throw new Exception();

                var custOrders = _partRepo.GetAllParts();

                return new DataTableResponse
                {
                    RecordsTotal = custOrders.Count(),
                    RecordsFiltered = 10,
                    Data = custOrders.ToArray()
                };
            }
            catch(Exception ex)
            {
                List<Part> data = new List<Part>();
                return new DataTableResponse
                {
                    RecordsTotal = 0,
                    RecordsFiltered = 10,
                    Data = data.ToArray()
                };
            }           
        }      

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        // public JsonResult Create([FromBody] Part part)
        public JsonResult Create(Part part)
        {
            OperationResult retData = new OperationResult();

            try
            {
                if (ModelState.IsValid)
                {
                    _partRepo.AddPart(part);

                    retData.Message = "Part is Created !";
                    retData.ModelErrors = new List<string>();
                    retData.StatusCode = 0;
                }
                else
                {
                    retData.Message = "Model is NOT Valid !";
                    retData.StatusCode = 1;
                    retData.ModelErrors = new List<string>();
                    foreach (var modelState in ViewData.ModelState.Values)
                    {
                        foreach (var error in modelState.Errors)
                        {
                            string mError = error.ErrorMessage.ToString();
                            retData.ModelErrors.Add(mError);
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                retData.Message = "Server Error !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }         
            return Json(new { Result = retData });
        }
    
        public ActionResult Edit(int id)  
        {
            try
            {
                // throw new Exception();

                var part = _partRepo.GetPart(id);
                return PartialView("_Edit", part);
            }
            catch(Exception ex)
            {                
                return PartialView("_Edit", null);
            }            
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Edit(Part part)
        {
            OperationResult retData = new OperationResult();

            try
            {
                if (ModelState.IsValid)
                {
                    _partRepo.EditPart(part);

                    retData.Message = "Part is Edited !";
                    retData.ModelErrors = new List<string>();
                    retData.StatusCode = 0;
                }
                else
                {
                    retData.Message = "Model is NOT Valid !";
                    retData.StatusCode = 1;
                    retData.ModelErrors = new List<string>();
                    foreach (var modelState in ViewData.ModelState.Values)
                    {
                        foreach (var error in modelState.Errors)
                        {
                            string mError = error.ErrorMessage.ToString();
                            retData.ModelErrors.Add(mError);
                        }
                    }
                }
            }
            catch (Record_Not_Found_Exception rnfEx)
            {
                retData.Message = rnfEx.Message;
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            catch (Exception ex)
            {
                retData.Message = "Server Error !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }
            return Json(new { Result = retData });
        }

        public ActionResult GetPartForDelete(int id)
        {
            try
            {
                // throw new Exception();

                var part = _partRepo.GetPart(id);
                return PartialView("_Delete", part);
            }
            catch(Exception ex)
            {
                return PartialView("_Delete", null);
            }           
        }
        [HttpPost]
        public JsonResult Delete(Part part)
        {
            OperationResult retData = new OperationResult();

            try
            {
                _partRepo.DeletePart(part.PartId);

                retData.Message = "Part is Deleted !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = 0;
            }
            catch(Exception ex)
            {
                retData.Message = "Server Error !";
                retData.ModelErrors = new List<string>();
                retData.StatusCode = -1;
            }     
            return Json(new { Result = retData });
        }

        // get
        // all part(s) history from operationid
        public ActionResult GetPartHistory(int id)
        {
            try
            {
                // throw new Exception();

                var partHistory = _partRepo.GetPartHistory(id);
                return PartialView("_GetPartHistory", partHistory);
            }
            catch(Exception ex)
            {
                return PartialView("_GetPartHistory", null);
            }          
        }

        // part file-upload
        public ActionResult PartFileUpload_Get(int id)
        {
            try
            {
                // throw new Exception();

                var part = _partRepo.GetPart(id);
                return View("PartFileUpload", part);
            }
            catch(Exception ex)
            {
                return View("PartFileUpload", null);
            }          
        }        
        public async Task<IActionResult> PartFileUpload_Post(List<IFormFile> files)
        {
            try
            {
                // throw new Exception();

                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "PartFiles");

                long size = files.Sum(f => f.Length);

                var filePaths = new List<string>();

                foreach (var formFile in files)
                {
                    if (formFile.Length > 0)
                    {
                        var fileName = DateTime.Now.Year + "-" + DateTime.Now.Month + "-" + DateTime.Now.Day + "-" + DateTime.Now.Hour + "-" + DateTime.Now.Minute + "-" + ContentDispositionHeaderValue.Parse(formFile.ContentDisposition).FileName.Trim('"');
                        var finalPath = Path.Combine(uploadFolder, fileName);

                        filePaths.Add(finalPath);

                        using (var stream = new FileStream(finalPath, FileMode.Create))
                        {
                            await formFile.CopyToAsync(stream);
                        }
                    }
                }
                return Ok(new { status = "Part - File Upload Success !", count = files.Count, size, filePaths });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "Server Error ! File Can Not Upload At This Time !" });
            }         
        }
        public async Task<IActionResult> PartFileUpload_Post_Json(IFormFile formFile, int partId)
        {
            try
            {
                // throw new Exception();
                
                string wwwPath = this.Environment.WebRootPath;
                string contentPath = this.Environment.ContentRootPath;
                string path = Path.Combine(this.Environment.WebRootPath, "PartFiles");
  
                var fileName = DateTime.Now.Year + "-" + DateTime.Now.Month + "-" + DateTime.Now.Day + "-" + DateTime.Now.Hour + "-" + DateTime.Now.Minute + "-" + ContentDispositionHeaderValue.Parse(formFile.ContentDisposition)
                      .FileName.Trim('"');
                
                var finalPath = Path.Combine(path, fileName);

                using var stream = new FileStream(finalPath, FileMode.Create);

                await formFile.CopyToAsync(stream);

                _partRepo.UpdatePartFile(partId, fileName);

                return Json(new { status="success", message = "Part - File Upload Success !", fileName = formFile.FileName, fileSize = formFile.Length });
            }
            catch (Exception ex)
            {
                // return Json(new { status = "error " + ex.Message });
                return Json(new { status="fail", message = "Server Error ! File Can Not Upload At This Time !" });
            }
        }
    }
}
