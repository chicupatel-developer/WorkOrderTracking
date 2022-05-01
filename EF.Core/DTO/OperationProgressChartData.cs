using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class OperationProgressChartData
    {
        public ArrayList OperationNumbers { get; set; }
        public ArrayList QtyDone { get; set; }
        public ArrayList QtyRequired { get; set; }
    }
}
