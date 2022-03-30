using EF.Core;
using EF.Core.Models;
using Service.Interface;
using System;
using System.Collections.Generic;
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
    }
}
