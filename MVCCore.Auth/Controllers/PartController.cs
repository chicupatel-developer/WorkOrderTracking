using Microsoft.AspNetCore.Mvc;
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

namespace MVCCore.Auth.Controllers
{
    [Authorize("Admin")]
    public class PartController : Controller
    {
        private readonly ILogger<PartController> _logger;
        private readonly IPartRepository _partRepo;

        public PartController(IPartRepository partRepo, ILogger<PartController> logger)
        {
            _partRepo = partRepo;
            _logger = logger;
        }     

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult<DataTableResponse> GetAllParts()
        {
            var custOrders = _partRepo.GetAllParts();

            return new DataTableResponse
            {
                RecordsTotal = custOrders.Count(),
                RecordsFiltered = 10,
                Data = custOrders.ToArray()
            };
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
            // int id = 1;
            var part = _partRepo.GetPart(id);           
            return PartialView("_Edit", part);    
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
            var part = _partRepo.GetPart(id);
            return PartialView("_Delete", part);
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
            var partHistory = _partRepo.GetPartHistory(id);
            return PartialView("_GetPartHistory", partHistory);
        }

        // part file-upload
        public ActionResult PartFileUpload_Get(int id)
        {
            ViewBag.SelectedPartId = id;
            return View("PartFileUpload");
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
        public async Task<IActionResult> PartFileUpload_Post_Json(IFormFile formFile)
        {
            try
            {
                // throw new Exception();

                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "PartFiles");

                var fileName = DateTime.Now.Year + "-" + DateTime.Now.Month + "-" + DateTime.Now.Day + "-" + DateTime.Now.Hour + "-" + DateTime.Now.Minute + "-" + ContentDispositionHeaderValue.Parse(formFile.ContentDisposition)
                      .FileName.Trim('"');
                var finalPath = Path.Combine(uploadFolder, fileName);

                using var stream = new FileStream(finalPath, FileMode.Create);

                await formFile.CopyToAsync(stream);
                return Json(new { status = "Part - File Upload Success !", fileName = formFile.FileName, fileSize = formFile.Length });
            }
            catch (Exception ex)
            {
                // return Json(new { status = "error " + ex.Message });
                return Json(new { status = "Server Error ! File Can Not Upload At This Time !" });
            }
        }
    }
}
