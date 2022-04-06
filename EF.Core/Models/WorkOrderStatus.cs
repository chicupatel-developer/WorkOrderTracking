using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EF.Core.Models
{
    public enum WorkOrderStatus
    {
        Not_Started,
        Start_Running,
        Stopped,
        Completed,
        Can_Not_Complete
    }
}
