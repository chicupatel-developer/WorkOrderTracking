using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EF.Core.Models
{
    public class Operator
    {
        [Key]
        public int OperatorId { get; set; }

        [Required(ErrorMessage = "First Name is Required!")]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is Required!")]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
        public ICollection<OperatorActivity> OperatorActivities { get; set; }
    }
}
