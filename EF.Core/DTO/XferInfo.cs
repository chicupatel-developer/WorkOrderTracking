using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class XferInfo
    {
        public int CustomerOrderId { get; set; }
        public string CustomerName { get; set; }
        public int WorkOrderId { get; set; }
        public int OperationNumber { get; set; }
    }
}
