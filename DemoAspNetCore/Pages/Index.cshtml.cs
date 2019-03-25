using DemoAspNetCore.DL;
using DemoAspNetCore.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Threading.Tasks;

namespace DemoAspNetCore.Pages
{
    public class CustomerEditModel : PageModel
    {
        [BindProperty]
        public CallListDto CallListDtoVal { get; set; }
        public void OnGet(int id)
        {
            Console.WriteLine(id);

            var dl = new CustomerDataLogic();
            CallListDtoVal = dl.Get(id);
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

        public async Task<IActionResult> OnPostDeleteAsync(int id)
        {
            Console.WriteLine("DEL Got Called " + id);

            return RedirectToPage();
        }
    }
}
