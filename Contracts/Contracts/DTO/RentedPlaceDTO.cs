using Contracts.Models;
using System;
using System.Threading.Tasks;
using Contracts.Datapersist;

namespace Contracts.DTO
{
    public class RentedPlaceDTO
    {
        public int Id { get; set; }
        public string RentedName { get; set; }
        public string Address { get; set; }

      

        public static RentedPlaceDTO FromEntity(RentedPlace entity)
        {
            if (entity == null)
                return null;

            return new RentedPlaceDTO
            {
                Id = entity.Id,
                RentedName = entity.RentedName,
                Address = entity.Address               
            };
        }

        public static async Task<RentedPlace> ToEntity(RentedPlaceDTO rentedPlaceDto, InfinityDataContext infinityDataContext)
        {
            if (rentedPlaceDto == null) return null;
            var entity = await infinityDataContext.RentedPlaces.FindAsync(rentedPlaceDto.Id);

            if (entity == null)
            {
                return new RentedPlace
                {
                    Id = entity.Id,
                    RentedName = rentedPlaceDto.RentedName,
                    Address = rentedPlaceDto.Address
                };
            }

            entity.RentedName = rentedPlaceDto.RentedName;
            entity.Address = rentedPlaceDto.Address;

            return entity;

        }

        public static async Task<RentedPlace> ToEntity(int id, InfinityDataContext infinityDataContext)
        {
            var entity = await infinityDataContext.RentedPlaces.FindAsync(id);

            if (entity == null)
            {
                return new RentedPlace
                {
                    Id = entity.Id,
                    RentedName = entity.RentedName,
                    Address = entity.Address
                };
            }

            return entity;
        }
    }
}
