using EF.Core;
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
        public bool AddCustomerOrder(CustomerOrder customerOrder)
        {
            try
            {
                // throw new Exception();

                appDbContext.CustomerOrders.Add(customerOrder);
                appDbContext.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
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
        
        public bool EditCustomerOrder(CustomerOrder customerOrder)
        {
            try
            {
                // throw new Exception();

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

                    return true;
                }
                else
                    return false;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool DeleteCustomerOrder(int customerOrderId)
        {
            try
            {
                // throw new Exception();

                var deletingCO = appDbContext.CustomerOrders
                                    .Where(x => x.CustomerOrderId== customerOrderId).FirstOrDefault();
                appDbContext.Remove(deletingCO);
                appDbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}
