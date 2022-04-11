using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class OP_Part_Unique_Exception : Exception
    {
        public OP_Part_Unique_Exception() : base() { }
        public OP_Part_Unique_Exception(string message) : base(message) { }
    }
}
