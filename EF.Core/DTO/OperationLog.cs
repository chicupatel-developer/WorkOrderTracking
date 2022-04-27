using EF.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class OperationLog
    {
        public int OperationId { get; set; }
        public int OperationNumber { get; set; }
        public int WorkOrderId { get; set; }
        public List<HistoryData> OperationHistory { get; set; }
    }
    public class HistoryData
    {
        public int OperatorId { get; set; }       
        public string OperatorName { get; set; }
        public DateTime OpStartRunTime { get; set; }
        public DateTime OpPauseRunTime { get; set; }
        public TimeSpan CycleTime { get; set; }
        public int QtyDone { get; set; }
    }
}
