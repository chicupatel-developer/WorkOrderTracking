﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVCCore.Auth.Models
{
    public class OperationResult
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public List<string> ModelErrors { get; set; }
        public int OtherIntData { get; set; }
        public string OtherStringData { get; set; }

    }
}