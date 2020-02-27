using Contracts.Models;
using System;

namespace Contracts.DTO
{
    public class ContractDto
    {

        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        public decimal TotalPrice { get; set; }
        public string BrokerName { get; set; }
        public string BrokerAddress { get; set; }
        public DateTime ContractStartDate { get; set; }
        public DateTime? ContractEndDate { get; set; }


        public static ContractDto FromEntity(Contract entity)
        {
            if (entity == null)
                return null;

            return new ContractDto
            {
                Id = entity.Id,
                CustomerName = entity.CustomerName,
                CustomerAddress = entity.CustomerAddress,
                TotalPrice = entity.TotalPrice,
                BrokerName = entity.BrokerName,
                BrokerAddress = entity.BrokerAddress,
                ContractStartDate = entity.ContractStartDate,
                ContractEndDate = entity.ContractEndDate
            };
        }
    }
}

