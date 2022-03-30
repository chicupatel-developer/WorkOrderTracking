using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EF.Core.Models
{
    public class CustomerOrder
    {
        [Key]
        public int CustomerOrderId { get; set; }
        public string CustomerName { get; set; }
        public string ProductName { get; set;  }
        public string ProductDesc { get; set; }
        public int OrderQuantity { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime OrderDueDate { get; set; }

        public WorkOrder WorkOrder { get; set; }
    }
}
