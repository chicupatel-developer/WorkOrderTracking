using EF.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class WorkOrderDTO
    {
        public int WorkOrderId { get; set; }
        public int CustomerOrderId { get; set; }
        public string CustomerName { get; set; }
        public string Customer { get; set; }
        public DateTime WorkOrderStartDate { get; set; }
        public WorkOrderStatus WorkOrderStatus { get; set; }
        public string StatusNote { get; set; }
    }
}
