using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EF.Core.Models
{
    public class WorkOrder
    {
        [Key]
        public int WorkOrderId { get; set; }

        [Required(ErrorMessage = "Customer Order Id is Required!")]
        public int? CustomerOrderId { get; set; }

        public CustomerOrder CustomerOrder { get; set; }

        [Display(Name = "Work Order Start Date")]
        [DataType(DataType.Date)]
        public DateTime? WorkOrderStartDate { get; set; }

        [Required(ErrorMessage = "Work Order Status is Required!")]
        [Display(Name = "Work Order Status")]
        public WorkOrderStatus WorkOrderStatus { get; set; }


        [Display(Name = "Status Note")]
        public string StatusNote { get; set; }

        [Display(Name = "Work Order End Date")]
        [DataType(DataType.Date)]
        public DateTime? WorkOrderEndDate { get; set; }

        public ICollection<Operation> Operations { get; set; }
    }
}
