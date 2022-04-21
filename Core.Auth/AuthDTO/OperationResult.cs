using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Core.Auth.AuthDTO
{
    public class OperationResult
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public List<string> ModelErrors { get; set; }
        public int OtherIntData { get; set; }
        public string OtherStringData { get; set; }


        // authentication data
        public bool IsAuthSuccessful { get; set; }
        public string ErrorMessage { get; set; }
        public string Token { get; set; }
        public bool Is2StepVerificationRequired { get; set; }
        public string Provider { get; set; }
        public string Username { get; set; }
        public string MyRole { get; set; }

    }
}