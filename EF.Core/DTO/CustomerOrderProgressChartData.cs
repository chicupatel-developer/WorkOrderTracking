using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class CustomerOrderProgressChartData
    {
        public string OperationNumber { get; set; }
        public int QtyDone { get; set; }  
        public int QtyRequired { get; set; }
    }
}
