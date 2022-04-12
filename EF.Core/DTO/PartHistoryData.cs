using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class PartHistoryData
    {
        public int OperationId { get; set; }
        public int OperationNumber { get; set; }
        public List<PartData> PartList { get; set; }
        public int WorkOrderId { get; set; }
        
    }
    public class PartData
    {
        public int PartId { get; set; }
        public string PartName { get; set; }
        public int XFERQTY { get; set; }
    }
}
