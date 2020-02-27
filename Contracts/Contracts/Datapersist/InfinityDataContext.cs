using Microsoft.EntityFrameworkCore;
using Contracts.Models;

namespace Contracts.Datapersist
{
    public class InfinityDataContext : DbContext
    {
        public InfinityDataContext(DbContextOptions<InfinityDataContext> options) 
            : base(options)
        { 
        }

        public DbSet<Contract> Contracts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
                    
        }

        
    }
}
