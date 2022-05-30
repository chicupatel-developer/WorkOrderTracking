using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Service.Utils
{
    public static class PartFilesFromHDUtil
    {
        static string startupPath = Directory.GetCurrentDirectory();

        static string rootDirPath = @"C:\WorkOrder-Tracking-jQuery\APICore.Auth\PartFiles\";
       
        public static List<string> GetPartFilesFromHD()
        {
            List<string> files = Directory.GetFiles(rootDirPath, "*.png", SearchOption.AllDirectories).ToList();
            List<string> fileNames = new List<string>();

            foreach (string file in files)
            {
                var fileName = Path.GetFileName(file);
                fileNames.Add(fileName);
            }

            return fileNames;
        }
    }
}
