using System;
using System.ComponentModel.DataAnnotations;

namespace DemoAspNetCore.Model
{
    public class Dealer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [Required]
        public decimal Balance { get; set; }
        [Required]
        [EmailAddress]
        [Display(Name = "Email Address")]
        public string Email { get; set; }
        public string EditUrl { get; set; }
    }
}
