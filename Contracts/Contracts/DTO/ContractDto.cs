using Contracts.Models;
using System;
using System.Threading.Tasks;
using Contracts.Datapersist;
using Contracts.Utilites;

namespace Contracts.DTO
{
    public class ContractDto
    {

        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        public string TotalPrice { get; set; }
        public string BrokerName { get; set; }
        public string BrokerAddress { get; set; }
        public DateTime ContractStartDate { get; set; }
        public DateTime ContractEndDate { get; set; }


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
                ContractStartDate = Utility.ConvertToUTC(entity.ContractStartDate),
                ContractEndDate = Utility.ConvertToUTC(entity.ContractEndDate)
            };
        }

        public static async Task<Contract> ToEntity(ContractDto contractDto, InfinityDataContext infinityDataContext)
        {
            if (contractDto == null) return null;
            var entity = await infinityDataContext.Contracts.FindAsync(contractDto.Id);

            if (entity == null)
            {
               return new Contract
                {
                    Id = contractDto.Id,
                    CustomerName = contractDto.CustomerName,
                    CustomerAddress = contractDto.CustomerAddress,
                    TotalPrice = contractDto.TotalPrice,
                    BrokerName = contractDto.BrokerName,
                    BrokerAddress = contractDto.BrokerAddress,
                    ContractStartDate = Utility.ConvertToUTC(contractDto.ContractStartDate),
                    ContractEndDate = Utility.ConvertToUTC(contractDto.ContractEndDate)
                };               
            }

            entity.CustomerName = contractDto.CustomerName;
            entity.CustomerAddress = contractDto.CustomerAddress;
            entity.TotalPrice = contractDto.TotalPrice;
            entity.BrokerName = contractDto.BrokerName;
            entity.BrokerAddress = contractDto.BrokerAddress;
            entity.ContractStartDate = Utility.ConvertToUTC(contractDto.ContractStartDate);
            entity.ContractEndDate = Utility.ConvertToUTC(contractDto.ContractEndDate);

            return entity;

        }

        public static async Task<Contract> ToEntity(int id, InfinityDataContext infinityDataContext)
        {            
            var entity = await infinityDataContext.Contracts.FindAsync(id);

            if (entity == null)
            {
                return new Contract
                {
                    Id = entity.Id,
                    CustomerName = entity.CustomerName,
                    CustomerAddress = entity.CustomerAddress,
                    TotalPrice = entity.TotalPrice,
                    BrokerName = entity.BrokerName,
                    BrokerAddress = entity.BrokerAddress,
                    ContractStartDate = Utility.ConvertToUTC(entity.ContractStartDate),
                    ContractEndDate = Utility.ConvertToUTC(entity.ContractEndDate)
                };
            }           

            return entity;
        }

      
    }
}

