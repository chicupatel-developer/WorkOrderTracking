using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class Invalid_WO_StartDate_Exception : Exception
    {
        public Invalid_WO_StartDate_Exception() : base() { }
        public Invalid_WO_StartDate_Exception(string message) : base(message) { }
    }
}
