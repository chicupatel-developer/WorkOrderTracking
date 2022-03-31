using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EF.Core.Models
{
    public class CustomerOrder
    {
        [Key]
        public int CustomerOrderId { get; set; }

        [Required(ErrorMessage = "Customer Name is Required!")]
        [Display(Name = "Customer Name")]
        public string CustomerName { get; set; }

        [Required(ErrorMessage = "Product Name is Required!")]
        [Display(Name = "Product Name")]
        public string ProductName { get; set;  }


        [Display(Name = "Product Description")]
        public string ProductDesc { get; set; }


        [Required(ErrorMessage = "Order QTY is Required!")]
        [Display(Name = "Order QTY")]
        public int? OrderQuantity { get; set; }


        [Required(ErrorMessage = "Order Date is Required!")]
        [Display(Name = "Order Date")]
        [DataType(DataType.Date)]
        [Remote(action: "VerifyOrderDate", controller: "CustomerOrder")]
        public DateTime? OrderDate
        {
            get; set;
        }


        [Required(ErrorMessage = "Order Due Date is Required!")]
        [Display(Name = "Order Due Date")]
        [DataType(DataType.Date)]
        [Remote(action: "VerifyOrderDueDate", controller: "CustomerOrder", AdditionalFields = nameof(OrderDate))]
        public DateTime? OrderDueDate { get; set; }

        public WorkOrder WorkOrder { get; set; }
    }
}
