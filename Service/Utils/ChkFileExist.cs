using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Service.Utils
{
    public class ChkFileExist
    {
        string startupPath = Directory.GetCurrentDirectory();

        string projectName = "APICore.Auth";
        string rootDirPath = @"C:\WorkOrder-Tracking-jQuery\APICore.Auth\PartFiles\";
       

        public List<string> CheckPartFileExistOrNot()
        {
            var files = from file
                            in Directory.EnumerateFiles(rootDirPath, "*.png");
            List<string> fileNames = new List<string>();

            foreach(var file in files)
            {
                
            }

            return fileNames;

        }
    }
}
