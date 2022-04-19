using EF.Core.DTO;
using EF.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkOrderTracking.Models;

namespace WorkOrderTracking.Controllers
{
    public class OperatorLogController : Controller
    {
        private readonly ILogger<OperationController> _logger;
        private readonly IWorkOrderRepository _wOrderRepo;
        private readonly ICustomerOrderRepository _custOrderRepo;
        private readonly IOperatorLogRepository _oprRepo;
        private readonly IOperationRepository _opRepo;

        public OperatorLogController(IOperatorLogRepository oprRepo, IOperationRepository opRepo, ICustomerOrderRepository custOrderRepo, IWorkOrderRepository wOrderRepo  ,ILogger<OperationController> logger)
        {
            _custOrderRepo = custOrderRepo;
            _wOrderRepo = wOrderRepo;
            _opRepo = opRepo;
            _oprRepo = oprRepo;
            _logger = logger;
        }

        public IActionResult Index()
        {
            var workOrders = _oprRepo.GetWorkOrderList();
            ViewBag.WorkOrders = workOrders;

            return View(workOrders);
        }
    }
}
