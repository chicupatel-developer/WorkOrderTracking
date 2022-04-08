using System;
using System.Collections.Generic;
using System.Text;

namespace EF.Core.DTO
{
    public class Record_Not_Found_Exception : Exception
    {
        public Record_Not_Found_Exception() : base() { }
        public Record_Not_Found_Exception(string message) : base(message) { }
    }
}
