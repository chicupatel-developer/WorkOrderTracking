using EF.Core.DTO;
using EF.Core.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Interface
{
    public interface IWorkOrderRepository
    {
        // List<WorkOrder> GetAllWorkOrders();
        IEnumerable<WorkOrderDTO> GetAllWorkOrders();

        List<SelectListItem> GetCustomerOrderList();
        bool AddWorkOrder(WorkOrder workOrder);
    }
}
