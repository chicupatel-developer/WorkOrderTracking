using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class WO_OP_Unique_Exception : Exception
    {
        public WO_OP_Unique_Exception() : base() { }
        public WO_OP_Unique_Exception(string message) : base(message) { }
    }
}
