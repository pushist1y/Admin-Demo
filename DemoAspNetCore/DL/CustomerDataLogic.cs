using DemoAspNetCore.Model;
using System;
using System.Collections.Generic;

namespace DemoAspNetCore.DL
{
    public class CustomerDataLogic
    {
        readonly List<string> _randomTitle = new List<string>() { "Demo One", "Demo Two", "Demo Three" };
        // Get All Records
        public List<Customer> GetAll()
        {
            var customerList = new List<Customer>();

            for (var i = 1; i <= 100; i++)
            {
                Random rnd = new Random();
                int val = rnd.Next(0, 2);

                var customer = new Customer
                {
                    Id = i,
                    Price = 3.33m,
                    Email = "jay@jay.com",
                    ReleaseDate = DateTime.Today,
                    Title = _randomTitle[val],
                    EditUrl = "https://www.google.com"
                };

                customerList.Add(customer);
            }

            return customerList;
        }


        // Get a record by Id
        public Customer Get(int id)
        {
            Console.WriteLine("Get All got called");
            var customer = new Customer
            {
                Id = id,
                Price = 3.33m,
                Email = "jay@jay.com",
                ReleaseDate = DateTime.Today,
                Title = "The Id Is " + id,
                EditUrl = "https://www.google.com"
            };

            return customer;
        }

        // Delete
        public bool Delete(int id)
        {
            Console.WriteLine("Delete got called");
            return true;
        }

        // Save
        public Customer Post(Customer dto)
        {
            Console.WriteLine("Post got called");

            if (dto.Email == "jay@gmail.com")
            {
                throw new Exception("Email is not Valid");
            }

            Random rnd = new Random();
            int val = rnd.Next(101, 200);

            var customer = new Customer
            {
                Id = val,
                Price = dto.Price,
                Email = dto.Email,
                ReleaseDate = dto.ReleaseDate,
                Title = dto.Title,
                EditUrl = dto.EditUrl
            };

            return customer;
        }

        // Update
        public Customer Put(Customer dto)
        {
            Console.WriteLine("Update Got Called");
            var customer = new Customer
            {
                Id = dto.Id,
                Price = dto.Price,
                Email = dto.Email,
                ReleaseDate = dto.ReleaseDate,
                Title = dto.Title,
                EditUrl = dto.EditUrl
            };

            return customer;
        }

    }
}
