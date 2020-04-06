using Contracts.Datapersist;
using Contracts.Models;
using Contracts.Utilites;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Contracts.DTO
{
    public class TenantDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DownPayment { get; set; }
        public string Deposit { get; set; }
        public string UsedDownPayment { get; set; }
        public string UsedDeposit { get; set; }
        public string Active { get; set; }
        public DateTime DateInsert { get; set; }
        public int RentedPlacesId { get; set; } 
        public string RentedName { get; set; }


        public static TenantDto FromEntity(Tenant entity)
        {
            if (entity == null)
                return null;

            return new TenantDto
            {
                Id = entity.Id,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                DownPayment = entity.DownPayment,
                Deposit = entity.Deposit,
                UsedDownPayment = entity.UsedDownPayment,
                UsedDeposit = entity.UsedDeposit,
                Active = entity.Active,
                DateInsert = Utility.ConvertToUTC(entity.DateInsert),
                RentedPlacesId = entity.RentedPlace.Id,
                RentedName = entity.RentedPlace.RentedName
            };
        }

        public static async Task<TenantDto> FromEntity(int id, InfinityDataContext infinityDataContext)
        {
            var entity = await infinityDataContext.Tenants.FindAsync(id);

            return new TenantDto
            {
                Id = entity.Id,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                DownPayment = entity.DownPayment,
                Deposit = entity.Deposit,
                UsedDownPayment = entity.UsedDownPayment,
                UsedDeposit = entity.UsedDeposit,
                Active = entity.Active,
                DateInsert = Utility.ConvertToUTC(entity.DateInsert),
                RentedPlacesId = entity.RentedPlace.Id,
                RentedName = entity.RentedPlace.RentedName
            };
        }

        public static async Task<Tenant> ToEntity(TenantDto tenantDto, InfinityDataContext infinityDataContext)
        {
            if (tenantDto == null) return null;
            var entity = await infinityDataContext.Tenants.FindAsync(tenantDto.Id);

            if (entity == null)
            {
                return new Tenant
                {
                    Id = tenantDto.Id,
                    FirstName = tenantDto.FirstName,
                    LastName = tenantDto.LastName,
                    DownPayment = tenantDto.DownPayment,
                    Deposit = tenantDto.Deposit,
                    UsedDownPayment = tenantDto.UsedDownPayment,
                    UsedDeposit = tenantDto.UsedDeposit,
                    Active = tenantDto.Active,
                    DateInsert = Utility.ConvertToUTC(tenantDto.DateInsert),
                    RentedPlace = await infinityDataContext.RentedPlaces.FirstOrDefaultAsync(i => i.Id == tenantDto.RentedPlacesId)

                };
            }

            entity.Id = tenantDto.Id;
            entity.FirstName = tenantDto.FirstName;
            entity.LastName = tenantDto.LastName;
            entity.DownPayment = tenantDto.DownPayment;
            entity.Deposit = tenantDto.Deposit;
            entity.UsedDownPayment = tenantDto.UsedDownPayment;
            entity.UsedDeposit = tenantDto.UsedDeposit;
            entity.Active = tenantDto.Active;
            entity.DateInsert = Utility.ConvertToUTC(tenantDto.DateInsert);
            entity.RentedPlace = await infinityDataContext.RentedPlaces.FirstOrDefaultAsync(i => i.Id == tenantDto.RentedPlacesId);                           

            return entity;
        }

        public static async Task<Tenant> ToEntity(int id, InfinityDataContext infinityDataContext)
        {
            var entity = await infinityDataContext.Tenants.FindAsync(id);

            if (entity == null)
            {
                return new Tenant
                {
                    Id = entity.Id,
                    FirstName = entity.FirstName,
                    LastName = entity.LastName,
                    DownPayment = entity.DownPayment,
                    Deposit = entity.Deposit,
                    UsedDownPayment = entity.UsedDownPayment,
                    UsedDeposit = entity.UsedDeposit,
                    Active = entity.Active,
                    DateInsert = Utility.ConvertToUTC(entity.DateInsert),
                    RentedPlace = await infinityDataContext.RentedPlaces.FirstOrDefaultAsync(i => i.Id == entity.RentedPlace.Id)

                };
            }

         return entity;            
        }

    }
}
