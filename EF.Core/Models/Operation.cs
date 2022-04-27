using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EF.Core.Models
{
    public class Operation
    {
        [Key]
        public int OperationId { get; set; }

        [Required(ErrorMessage = "Operation Number is Required!")]
        [Display(Name = "Operation Number")]
        public int OperationNumber { get; set; } // 10,20,30,,, : enum

        [Required(ErrorMessage = "Work Order is Required!")]
        public int? WorkOrderId { get; set; } // F.K // WorkOrder
        public WorkOrder WorkOrder { get; set; }

        [Display(Name = "Operation Details")]
        public string Details { get; set; }

        [Required(ErrorMessage = "Operation Status is Required!")]
        [Display(Name = "Operation Status")]
        public OperationStatus OperationStatus { get; set; } // : enum

        [Display(Name = "Operation Start Date")]
        [DataType(DataType.Date)]
        public DateTime? OperationStartDate { get; set; }

        [Display(Name = "Operation QTY Required")]
        public int? OpQTYRequired { get; set; }
       
        [Display(Name = "Operation QTY Done")]
        public int? OpQTYDone { get; set; }

        public ICollection<OperationToPart> OperationToParts { get; set; }

    }
}
