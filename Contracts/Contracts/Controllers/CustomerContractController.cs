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
    [Route("api/CustomerContract")]
    [ApiController]
    public class CustomerContractController : ControllerBase
    {

        private readonly InfinityDataContext _context;

        public CustomerContractController(
            InfinityDataContext context)
        {
            _context = context;
        }

        // GET: api/Contract
        /// <summary>
        ///  Return the data 
        ///  CustomerContractDto carries data between processes       
        /// </summary>
        [HttpGet]
        [Route("AllContractDetails")]
        public async Task<ActionResult<IEnumerable<ContractDto>>> Get()
        {
            return await _context.Contracts
              .OrderBy(i => i.CustomerName)
              .Select(i => ContractDto.FromEntity(i))
              .ToListAsync();
        }

        [HttpGet]
        [Route("GetContractDetailsById/{Id}")]

        public async Task<IActionResult> GetContractById(string id)
        {
            int ID = Convert.ToInt32(id);
            var entity = await ContractDto.ToEntity(ID, _context);

            if (entity == null) return NotFound();

            return Ok(entity);
        }

        [HttpPut]
        [Route("UpdateContractDetails")]
        public async Task<IActionResult> Put(ContractDto contractDto)
        {
            var entity = await ContractDto.ToEntity(contractDto, _context);          

            if (entity == null) return NotFound();          
           
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { }, contractDto);

        }

        [HttpPost]
        [Route("InsertContractDetails")]
        public async Task<ActionResult<ContractDto>> Post(ContractDto dto)
        {
            var entity = await ContractDto.ToEntity(dto, _context);
            if (entity == null) return NotFound();

            await _context.Contracts.AddAsync(entity);
            await _context.SaveChangesAsync();

            var contractDto = ContractDto.FromEntity(entity);

            return CreatedAtAction("Get", new { }, contractDto);
        }

        [HttpDelete]
        [Route("DeleteContractDetails")]

        public async Task<IActionResult> Delete(int id)
        {            
            var entity = await ContractDto.ToEntity(id, _context);

            if (entity == null) return NotFound();            
            _context.Contracts.Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();

        }

    }
}
