using EF.Core;
using EF.Core.DTO;
using EF.Core.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Service.Repository
{
    public class WorkOrderRepository : IWorkOrderRepository
    {
        private readonly WorkOrderTrackingContext appDbContext;
        public WorkOrderRepository(WorkOrderTrackingContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        /*
        public List<WorkOrder> GetAllWorkOrders()
        {
            List<WorkOrder> datas = new List<WorkOrder>();

            var wOrders_ = appDbContext.WorkOrders;
            if (wOrders_ != null && wOrders_.Count() > 0)
            {
                datas = wOrders_.ToList();
            }    
            return datas;
        }
        */

        public IEnumerable<WorkOrderDTO> GetAllWorkOrders()
        {
            var datas = new List<WorkOrderDTO>();

            var wOrders_ = appDbContext.WorkOrders.Include(x=>x.CustomerOrder);
            if (wOrders_ != null && wOrders_.Count() > 0)
            {
                foreach(var wo in wOrders_)
                {
                    datas.Add(new WorkOrderDTO()
                    {    
                        Customer = "[ " + wo.CustomerOrderId + " ] " +((wo.CustomerOrder != null) ? wo.CustomerOrder.CustomerName : "No-Customer"),
                        CustomerName = (wo.CustomerOrder!=null) ? wo.CustomerOrder.CustomerName : "No-Customer",
                         CustomerOrderId = wo.CustomerOrderId,
                          StatusNote = wo.StatusNote,
                           WorkOrderId = wo.WorkOrderId,
                            WorkOrderStartDate = wo.WorkOrderStartDate,
                             WorkOrderStatus = wo.WorkOrderStatus
                    });
                }
            }
            return datas;
        }

        public List<SelectListItem> GetCustomerOrderList()
        {
            List<SelectListItem> datas = new List<SelectListItem>();

            foreach(var co in appDbContext.CustomerOrders)
            {
                datas.Add(new SelectListItem()
                {
                     Value = co.CustomerOrderId.ToString(),
                      Text = co.CustomerName
                });
            }
            return datas;
        }

    }
}
