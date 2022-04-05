using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EF.Core.Models
{
    public class WorkOrder
    {
        [Key]
        public int WorkOrderId { get; set; }

        public int CustomerOrderId { get; set; }
        public CustomerOrder CustomerOrder { get; set; }

        public DateTime? WorkOrderStartDate { get; set; }
        
        
        public WorkOrderStatus WorkOrderStatus { get; set; }

        public string StatusNote { get; set; }
    }
}
