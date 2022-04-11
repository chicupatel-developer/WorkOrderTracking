using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class Not_Enough_QTY_Exception : Exception
    {
        public Not_Enough_QTY_Exception() : base() { }
        public Not_Enough_QTY_Exception(string message) : base(message) { }
    }
}
