using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Contracts.Models
{
    public class Tenant
    {
        [Required] public int Id { get; set; }
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        public string DownPayment { get; set; }
        public string Deposit { get; set; }
        public string UsedDownPayment { get; set; }
        public string UsedDeposit { get; set; }
        public string Active { get; set; }
        [Required] public DateTime DateInsert { get; set; }
        public virtual RentedPlace RentedPlace { get; set; }


    }
}
