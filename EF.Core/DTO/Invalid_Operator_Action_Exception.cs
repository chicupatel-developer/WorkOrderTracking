using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class Invalid_Operator_Action_Exception : Exception
    {
        public Invalid_Operator_Action_Exception() : base() { }
        public Invalid_Operator_Action_Exception(string message) : base(message) { }
    }
}
