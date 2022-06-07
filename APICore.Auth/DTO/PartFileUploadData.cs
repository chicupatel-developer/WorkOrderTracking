using Microsoft.AspNetCore.Http;
using Service.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore.Auth.DTO
{
    public class PartFileUploadData
    {
        public string PartId { get; set; }

        // 1 MB
        [MaxFileSize(1 * 1024 * 1024)]
        [FileType(new string[] { ".jpg", ".png" })]
        public IFormFile PartImage { get; set; }
    }
}
