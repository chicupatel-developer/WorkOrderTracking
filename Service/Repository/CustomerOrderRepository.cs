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
    }
}
