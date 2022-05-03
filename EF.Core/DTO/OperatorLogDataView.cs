using EF.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class OperatorLogDataView
    {
        public string UserId { get; set; }
        public ViewMyLogData LogDataRange { get; set; }
    }
}
