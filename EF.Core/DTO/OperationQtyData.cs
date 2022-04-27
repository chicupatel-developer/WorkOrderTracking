using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class OperationQtyData
    {
        public int OperationId { get; set; }
        public int QtyDone { get; set; }
        public int QtyRequired { get; set; }
    }
}
