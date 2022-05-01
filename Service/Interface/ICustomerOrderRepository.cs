using EF.Core.DTO;
using EF.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Interface
{
    public interface ICustomerOrderRepository
    {
        void AddCustomerOrder(CustomerOrder customerOrder);
        List<CustomerOrder> GetAllCustomerOrders();
        CustomerOrder GetCustomerOrder(int customerOrderId);
        void EditCustomerOrder(CustomerOrder customerOrder);
        void DeleteCustomerOrder(int customerOrderId);
        CustomerOrderProgress GetCustomerOrderProgress(int cid);
        OperationProgressChartData GetOperationProgressForCustomerOrder(int cid);
    }
}
