using System.Collections.Generic;
using DemoAspNetCore.DL;
using DemoAspNetCore.Model;
using Microsoft.AspNetCore.Mvc;

namespace DemoAspNetCore.Controllers.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataController: Controller
    {
        private readonly CustomerDataLogic _dataProvider;
        public DataController()
        {
            _dataProvider = new CustomerDataLogic();
        }

        [HttpGet("index/{id:int}")]
        public ActionResult<DataResult<CallListDto>> GetList(int id)
        {
            var data = _dataProvider.GetAll(id);
            return new DataResult<CallListDto> {Data = data, Total = data.Count};
        }
    }

    public class DataResult<T> where T: class
    {
        public IEnumerable<T> Data { get; set; }

        public int Total { get; set; }
    }
}
