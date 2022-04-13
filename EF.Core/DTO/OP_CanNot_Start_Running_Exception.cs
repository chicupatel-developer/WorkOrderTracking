using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class OP_CanNot_Start_Running_Exception : Exception
    {
        public OP_CanNot_Start_Running_Exception() : base() { }
        public OP_CanNot_Start_Running_Exception(string message) : base(message) { }
    }
}
