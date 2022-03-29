using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkOrderTracking.Models
{
    public class Part
    {
        public int PartId { get; set; }
        [Required(ErrorMessage = "Part Name is Required!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Part Desc is Required!")]
        public string Desc { get; set; }
        public int CustomerOrderId { get; set; }
        public int WorkOrderId { get; set; }
    }
}
