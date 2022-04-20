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
        public OperationStatusForOperator OperationStatus { get; set; }

        [Display(Name = "QTY Done")]
        public int? OpQtyDone { get; set; }

        [Display(Name = "[Start] Run Time")]
        public DateTime? OpStartRunTime { get; set; }

        [Display(Name = "[Pause] Run Time")]
        public DateTime? OpPauseRunTime { get; set; }

        [Display(Name = "[Cycle] Run Time")]
        public TimeSpan? CycleTime { get; set; }
    }
}
