using System;
using System.ComponentModel.DataAnnotations;

namespace Contracts.Models
{
    public class Account
    {
        [Required] public int Id { get; set; }
        [Required] public DateTime PaymentDate { get; set; }       
        public string RentAmountPaid { get; set; }
        public string ElectricBillPaid{ get; set; }
        public string WaterBillPaid { get; set; }
        public string Remarks { get; set; }
        public string MonthPaid { get; set; }
        [Required] public virtual Tenant Tenant { get; set; }
    }
}
