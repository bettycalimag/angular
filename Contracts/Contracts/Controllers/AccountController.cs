using Contracts.Datapersist;
using Contracts.DTO;
using Ionic.Zip;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contracts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly InfinityDataContext _context;
        private IHostEnvironment _env;
        public AccountController(
            InfinityDataContext context, IHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/Account
        /// <summary>
        ///  Return the data 
        ///  AccountDto carries data between processes       
        /// </summary>
        [HttpGet]
        [Route("AllAccountDetails")]
        public async Task<ActionResult<IEnumerable<AccountDto>>> Get()
        {

            return await _context.Accounts
               .OrderBy(i => i.PaymentDate)
               .Select(i => AccountDto.FromEntity(i))
               .ToListAsync();
        }

        [HttpGet]
        [Route("GetAccountDetailsById/{Id}")]

        public async Task<IActionResult> GetAccountById(string id)
        {
            int ID = Convert.ToInt32(id);
            var entity = await AccountDto.FromEntity(ID, _context);

            if (entity == null) return NotFound();

            return Ok(entity);
        }

        [HttpGet]
        [Route("GetExport/{iMonat}")]
        public async Task<IActionResult> GetExport(int iMonat)
        {
            var contentRootPath = _env.ContentRootPath;
            
            using (ZipFile zip = new ZipFile())
            {
                zip.AlternateEncodingUsage = ZipOption.AsNecessary;
                zip.AddDirectoryByName("Files");


                //Set the Name of Zip File.
                string zipName = String.Format("Zip_{0}.zip", DateTime.Now.ToString("yyyy-MMM-dd-HHmmss"));
                var memoryStream = new System.IO.MemoryStream();
                var file = System.IO.Path.Combine(contentRootPath, "MonthlyReposrt");
                AccountDto.ProcessWrite(_context,iMonat, file);
                zip.AddFile("MonthlyReposrt" + ".csv", "Files");

                    using (var stream = new FileStream(file + ".csv", FileMode.Open))
                    {
                        await stream.CopyToAsync(memoryStream);
                    }                

                //Save the Zip File to MemoryStream.
                zip.Save(memoryStream);

                memoryStream.Position = 0;               
                return NoContent();

            }
        }

        [HttpPut]
        [Route("UpdateAccountDetails")]
        public async Task<IActionResult> Put(AccountDto dto)
        {
            var entity = await AccountDto.ToEntity(dto, _context);

            if (entity == null) return NotFound();

            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { }, dto);

        }

        [HttpPost]
        [Route("InsertAccountDetails")]
        public async Task<ActionResult<AccountDto>> Post(AccountDto dto)
        {
            var entity = await AccountDto.ToEntity(dto, _context);
            if (entity == null) return NotFound();

            await _context.Accounts.AddAsync(entity);
            await _context.SaveChangesAsync();

            var contractDto = AccountDto.FromEntity(entity);

            return CreatedAtAction("Get", new { }, contractDto);
        }

        [HttpDelete]
        [Route("DeleteAccountDetails")]

        public async Task<IActionResult> Delete(int id)
        {
            var entity = await AccountDto.ToEntity(id, _context);

            if (entity == null) return NotFound();
            _context.Accounts.Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}