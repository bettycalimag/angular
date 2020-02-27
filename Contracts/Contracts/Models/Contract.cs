using System;
using System.ComponentModel.DataAnnotations;


namespace Contracts.Models
{
    public class Contract 
    {
        public int Id { get; set; }
        [Required] public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        [Required] public decimal TotalPrice { get; set; }
        [Required] public string BrokerName { get; set; }
        public string BrokerAddress { get; set; }
        [Required] public DateTime ContractStartDate { get; set; }
        public DateTime? ContractEndDate { get; set; }
    }
}
