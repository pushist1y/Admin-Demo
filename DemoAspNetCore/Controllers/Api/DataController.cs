using System;
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

        [HttpGet("{id:int}")]
        public ActionResult<CallListDto> GetOne(int id)
        {
            var data = _dataProvider.Get(id);
            return data;
        }

        [HttpPost]
        public ActionResult<CallListDto> Create([FromForm] CallListDto input)
        {
            try
            {
                return _dataProvider.Post(input);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public ActionResult<CallListDto> Edit([FromForm] CallListDto input)
        {
            try
            {
                return _dataProvider.Put(input);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public ActionResult<bool> Delete(int id)
        {
            try
            {
                return _dataProvider.Delete(id);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }

    public class DataResult<T> where T: class
    {
        public IEnumerable<T> Data { get; set; }

        public int Total { get; set; }
    }
}
