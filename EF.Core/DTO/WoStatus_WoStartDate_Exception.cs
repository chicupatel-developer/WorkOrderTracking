using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class WoStatus_WoStartDate_Exception : Exception
    {
        public WoStatus_WoStartDate_Exception() : base() { }
        public WoStatus_WoStartDate_Exception(string message) : base(message) { }
    }
}
