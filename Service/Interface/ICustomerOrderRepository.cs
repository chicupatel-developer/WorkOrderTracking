using EF.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Interface
{
    public interface ICustomerOrderRepository
    {
        bool AddCustomerOrder(CustomerOrder customerOrder);
        List<CustomerOrder> GetAllCustomerOrders();
    }
}
