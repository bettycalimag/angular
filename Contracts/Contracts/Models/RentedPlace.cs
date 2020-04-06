using System.ComponentModel.DataAnnotations;

namespace Contracts.Models
{
    public class RentedPlace
    {
        [Required] public int Id { get; set; }
        [Required] public string RentedName { get; set; }
        public string Address { get; set; }

        

    }
}
