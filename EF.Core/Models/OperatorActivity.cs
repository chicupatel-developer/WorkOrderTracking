using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EF.Core.Models
{
    public class OperatorActivity
    {
        [Key]
        public int OperatorActivityId { get; set; }


        [Required(ErrorMessage = "Operator is Required!")]
        public int? OperatorId { get; set; }
        public Operator Operator { get; set; }


        [Required(ErrorMessage = "WorkOrder is Required!")]
        public int? WorkOrderId { get; set; }


        [Required(ErrorMessage = "Operation is Required!")]
        public int? OperationId { get; set; }

        [Required(ErrorMessage = "Operation Number is Required!")]
        [Display(Name = "Operation Number")]
        public OperationNumber OperationNumber { get; set; }

        [Required(ErrorMessage = "Operation Status is Required!")]
        [Display(Name = "Operation Status")]
        public OperationStatus OperationStatus { get; set; }
        public int? OpQtyDone { get; set; }
        public DateTime? OpStartRunTime { get; set; }
        public DateTime? OpPauseRunTime { get; set; }
    }
}
