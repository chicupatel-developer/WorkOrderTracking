using EF.Core.DTO;
using EF.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Interface
{
    public interface IWorkOrderRepository
    {
        // List<WorkOrder> GetAllWorkOrders();
        IEnumerable<WorkOrderDTO> GetAllWorkOrders();
        
    }
}
