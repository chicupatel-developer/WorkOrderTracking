using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EF.Core.Models
{
    public enum OperationNumber
    {
        Spindle = 10,
        Hub_Single_Head = 20,
        Hub_Double_Head = 30,
        Push_Cups = 40,
        Assembly_Spindle_Hub = 50,
        Paint = 60,
        Packaging = 70,
        Rework_Spindle = 80,
        Rework_Hub = 90
    }
}
