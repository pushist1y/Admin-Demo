using DemoAspNetCore.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;

namespace DemoAspNetCore.Pages
{
    public class CustomerEditModel : PageModel
    {
        [BindProperty]
        public Customer CustomerVal { get; set; }
        public void OnGet(int id)
        {
            Console.WriteLine(id);
            Random rnd = new Random();
            int val = rnd.Next(0, 2);

            CustomerVal = new Customer
            {
                Id = id,
                Price = 3.33m,
                Email = "jay@jay.com",
                ReleaseDate = DateTime.Today,
                Title = "Test",
                EditUrl = "https://www.google.com"
            };

        }

        public IActionResult OnPostAsync()
        {
            Console.WriteLine("Post Got Called");
            if (!ModelState.IsValid)
            {
                return Page();
            }

            return RedirectToPage("/Index");
        }
    }
}
