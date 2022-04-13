using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class WO_CanNot_Not_Started_Exception : Exception
    {
        public WO_CanNot_Not_Started_Exception() : base() { }
        public WO_CanNot_Not_Started_Exception(string message) : base(message) { }
    }
}
