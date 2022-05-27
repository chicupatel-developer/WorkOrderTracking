using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore.Auth.DTO
{
    public class PartFileUploadData
    {
        public string PartId { get; set; }
        public IFormFile PartImage { get; set; }
    }
}
