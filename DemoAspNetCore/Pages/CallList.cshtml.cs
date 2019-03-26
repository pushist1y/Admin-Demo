using System;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DemoAspNetCore.Pages
{
    public class IndexModel : PageModel
    {
        public int Id { get;set; }

        public void OnGet(int id)
        {
            Id = id;
        }
    }
}
