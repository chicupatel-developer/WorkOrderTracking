using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EF.Core.Models
{
    public class Part
    {
        [Key]
        public int PartId { get; set; }
        [Required(ErrorMessage = "Part Name is Required!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Part Desc is Required!")]
        public string Desc { get; set; }

        [Required(ErrorMessage = "Part QTY is Required!")]
        [Range(1, 10000, ErrorMessage = "QTY must be between 1 and 10000")]
        public int? Qty { get; set; }

        public ICollection<OperationToPart> OperationToParts { get; set; }
    }
}
