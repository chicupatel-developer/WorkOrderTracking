using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class Invalid_Operator_LogData_Exception : Exception
    {
        public Invalid_Operator_LogData_Exception() : base() { }
        public Invalid_Operator_LogData_Exception(string message) : base(message) { }
    }
}
