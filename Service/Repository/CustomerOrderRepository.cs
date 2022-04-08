using EF.Core;
using EF.Core.DTO;
using EF.Core.Models;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Service.Repository
{
    public class CustomerOrderRepository : ICustomerOrderRepository
    {
        private readonly WorkOrderTrackingContext appDbContext;
        public CustomerOrderRepository(WorkOrderTrackingContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        public void AddCustomerOrder(CustomerOrder customerOrder)
        {
            appDbContext.CustomerOrders.Add(customerOrder);
            appDbContext.SaveChanges();
        }    
        public List<CustomerOrder> GetAllCustomerOrders()
        {
            List<CustomerOrder> datas = new List<CustomerOrder>();

            var custOrders_ = appDbContext.CustomerOrders;
            if (custOrders_ != null && custOrders_.Count() > 0)
                datas = custOrders_.ToList();

            return datas;
        }
        public CustomerOrder GetCustomerOrder(int customerOrderId)
        {
            var co = appDbContext.CustomerOrders
                     .Where(x => x.CustomerOrderId == customerOrderId).FirstOrDefault();
            return co;
        }        
        public void EditCustomerOrder(CustomerOrder customerOrder)
        {
            var _co = appDbContext.CustomerOrders
                              .Where(x => x.CustomerOrderId == customerOrder.CustomerOrderId).FirstOrDefault();
            if (_co != null)
            {
                _co.CustomerName = customerOrder.CustomerName;
                _co.OrderDate = customerOrder.OrderDate;
                _co.OrderDueDate = customerOrder.OrderDueDate;
                _co.OrderQuantity = customerOrder.OrderQuantity;
                _co.ProductDesc = customerOrder.ProductDesc;
                _co.ProductName = customerOrder.ProductName;

                appDbContext.SaveChanges();
            }
            else
                throw new Record_Not_Found_Exception("Customer Order Not Found !");
        }
        public void DeleteCustomerOrder(int customerOrderId)
        {
            var deletingCO = appDbContext.CustomerOrders
                                 .Where(x => x.CustomerOrderId == customerOrderId).FirstOrDefault();
            appDbContext.Remove(deletingCO);
            appDbContext.SaveChanges();
        }

    }
}
