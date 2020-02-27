using Contracts.Datapersist;
using Contracts.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contracts.Controllers
{
    [Route("api/[controller]")]
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
               

    }
}
