using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EF.Core.Models
{
    public class OperationToPart
    {
        [Key]
        public int OperationToPartId { get; set; }

        [Required(ErrorMessage = "Operation is Required!")]
        public int? OperationId { get; set; }
        public Operation Operation { get; set; }

        [Required(ErrorMessage = "Part is Required!")]
        public int? PartId { get; set; }
        public Part Part { get; set; }

        [Display(Name = "XFER QTY")]
        [Required(ErrorMessage = "XFER QTY is Required!")]
        [Range(1, 10000, ErrorMessage = "XFER QTY must be between 1 and 10000")]
        public int? XFERQTY { get; set; }
    }
}
