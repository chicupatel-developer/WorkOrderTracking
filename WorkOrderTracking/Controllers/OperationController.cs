using EF.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkOrderTracking.Models;

namespace WorkOrderTracking.Controllers
{
    public class OperationController : Controller
    {
        private readonly ILogger<OperationController> _logger;
        private readonly IWorkOrderRepository _wOrderRepo;
        private readonly ICustomerOrderRepository _custOrderRepo;
        private readonly IOperationRepository _opRepo;

        public OperationController(IOperationRepository opRepo, ICustomerOrderRepository custOrderRepo, IWorkOrderRepository wOrderRepo  ,ILogger<OperationController> logger)
        {
            _custOrderRepo = custOrderRepo;
            _wOrderRepo = wOrderRepo;
            _opRepo = opRepo;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult<DataTableResponse> GetAllWorkOrderOperations()
        {
            var ops = _opRepo.GetAllWorkOrderOperations();

            return new DataTableResponse
            {
                RecordsTotal = ops.Count(),
                RecordsFiltered = 10,
                Data = ops.ToArray()
            };
        }

    }
}
