using Contracts.Datapersist;
using Contracts.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contracts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentedPlaceController : ControllerBase
    {
        private readonly InfinityDataContext _context;

        public RentedPlaceController(
            InfinityDataContext context)
        {
            _context = context;
        }

        // GET: api/RentedPlace
        /// <summary>
        ///  Return the data 
        ///  CustomerRentedPlaceDto carries data between processes       
        /// </summary>
        [HttpGet]
        [Route("AllRentedPlaceDetails")]
        public async Task<ActionResult<IEnumerable<RentedPlaceDTO>>> Get()
        {

           return await _context.RentedPlaces
              .OrderBy(i => i.RentedName)
              .Select(i => RentedPlaceDTO.FromEntity(i))
              .ToListAsync();
        }

        [HttpGet]
        [Route("GetRentedPlaceDetailsById/{Id}")]

        public async Task<IActionResult> GetRentedPlaceById(string id)
        {
            int ID = Convert.ToInt32(id);
            var entity = await RentedPlaceDTO.ToEntity(ID, _context);

            if (entity == null) return NotFound();

            return Ok(entity);
        }

        [HttpPut]
        [Route("UpdateRentedPlaceDetails")]
        public async Task<IActionResult> Put(RentedPlaceDTO dto)
        {
            var entity = await RentedPlaceDTO.ToEntity(dto, _context);

            if (entity == null) return NotFound();

            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { }, dto);

        }

        [HttpPost]
        [Route("InsertRentedDetails")]
        public async Task<ActionResult<RentedPlaceDTO>> Post(RentedPlaceDTO dto)
        {
            var entity = await RentedPlaceDTO.ToEntity(dto, _context);
            if (entity == null) return NotFound();

            await _context.RentedPlaces.AddAsync(entity);
            await _context.SaveChangesAsync();

            var contractDto = RentedPlaceDTO.FromEntity(entity);

            return CreatedAtAction("Get", new { }, contractDto);
        }

        [HttpDelete]
        [Route("DeleteRentedPlaceDetails")]

        public async Task<IActionResult> Delete(int id)
        {
            var entity = await RentedPlaceDTO.ToEntity(id, _context);

            if (entity == null) return NotFound();
            _context.RentedPlaces.Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}
