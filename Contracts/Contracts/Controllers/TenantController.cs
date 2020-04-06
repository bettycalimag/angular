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
    public class TenantController : ControllerBase
    {
        private readonly InfinityDataContext _context;

        public TenantController(
            InfinityDataContext context)
        {
            _context = context;
        }

        // GET: api/Tenant
        /// <summary>
        ///  Return the data 
        ///  CustomerTenantDto carries data between processes       
        /// </summary>
        [HttpGet]
        [Route("AllTenantDetails")]
        public async Task<ActionResult<IEnumerable<TenantDto>>> Get()
        {

            return await _context.Tenants
               .OrderBy(i => i.LastName)
               .Select(i => TenantDto.FromEntity(i))
               .ToListAsync();
        }

        [HttpGet]
        [Route("GetTenantDetailsById/{Id}")]

        public async Task<IActionResult> GetTenantById(string id)
        {
            int ID = Convert.ToInt32(id);
            var entity = await TenantDto.FromEntity(ID, _context);

            if (entity == null) return NotFound();

            return Ok(entity);
        }

        [HttpPut]
        [Route("UpdateTenantDetails")]
        public async Task<IActionResult> Put(TenantDto dto)
        {
            var entity = await TenantDto.ToEntity(dto, _context);

            if (entity == null) return NotFound();

            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { }, dto);

        }

        [HttpPost]
        [Route("InsertTenantDetails")]
        public async Task<ActionResult<TenantDto>> Post(TenantDto dto)
        {
            var entity = await TenantDto.ToEntity(dto, _context);
            if (entity == null) return NotFound();

            await _context.Tenants.AddAsync(entity);
            await _context.SaveChangesAsync();

            var contractDto = TenantDto.FromEntity(entity);

            return CreatedAtAction("Get", new { }, contractDto);
        }

        [HttpDelete]
        [Route("DeleteTenantDetails")]

        public async Task<IActionResult> Delete(int id)
        {
            var entity = await TenantDto.ToEntity(id, _context);

            if (entity == null) return NotFound();
            _context.Tenants.Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}