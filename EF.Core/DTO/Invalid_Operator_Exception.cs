using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class Invalid_Operator_Exception : Exception
    {
        public Invalid_Operator_Exception() : base() { }
        public Invalid_Operator_Exception(string message) : base(message) { }
    }
}
