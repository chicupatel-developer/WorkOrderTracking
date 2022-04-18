using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class Invalid_WO_Status_Exception : Exception
    {
        public Invalid_WO_Status_Exception() : base() { }
        public Invalid_WO_Status_Exception(string message) : base(message) { }
    }
}
