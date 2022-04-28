using EF.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class CustomerOrderProgress
    {
        public CustomerOrder CustomerOrder { get; set; }
        public WorkOrder WorkOrder { get; set; }
        public List<Operation> Operations { get; set; }
    }
}
