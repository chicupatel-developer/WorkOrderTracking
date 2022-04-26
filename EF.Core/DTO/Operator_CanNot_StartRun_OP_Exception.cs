using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class Operator_CanNot_StartRun_OP_Exception : Exception
    {
        public Operator_CanNot_StartRun_OP_Exception() : base() { }
        public Operator_CanNot_StartRun_OP_Exception(string message) : base(message) { }
    }
}
