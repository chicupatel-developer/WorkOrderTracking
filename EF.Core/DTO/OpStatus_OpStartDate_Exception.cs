using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class OpStatus_OpStartDate_Exception : Exception
    {
        public OpStatus_OpStartDate_Exception() : base() { }
        public OpStatus_OpStartDate_Exception(string message) : base(message) { }
    }
}
