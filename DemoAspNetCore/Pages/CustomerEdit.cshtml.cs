using DemoAspNetCore.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;

namespace DemoAspNetCore.Pages
{
    public class CustomerEditModel : PageModel
    {
        [BindProperty]
        public Dealer DealerVal { get; set; }
        public void OnGet(int id)
        {
            Console.WriteLine(id);

            DealerVal = new Dealer
            {
                Id = id,
                Balance = 3.33m,
                Email = "jay@jay.com",
                StartDate = DateTime.Today,
                Name = "Test",
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
