using DemoAspNetCore.Model;
using System;
using System.Collections.Generic;

namespace DemoAspNetCore.DL
{
    public class CustomerDataLogic
    {
        // Get All Records
        public List<Customer> GetAll()
        {
            var customerList = new List<Customer>();

            for (var i = 1; i <= 100; i++)
            {
                var customer = new Customer
                {
                    Id = i,
                    Price = 3.33m,
                    Email = "jay@jay.com",
                    ReleaseDate = DateTime.Today,
                    Title = "Demo"
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
                Title = "The Id Is " + id
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
            var customer = new Customer
            {
                Id = 1,
                Price = dto.Price,
                Email = dto.Email,
                ReleaseDate = dto.ReleaseDate,
                Title = dto.Title
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
                Title = dto.Title
            };

            return customer;
        }

    }
}
