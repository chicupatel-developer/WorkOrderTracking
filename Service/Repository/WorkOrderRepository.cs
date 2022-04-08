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
                         CustomerOrderId = (int)wo.CustomerOrderId,
                          StatusNote = wo.StatusNote,
                           WorkOrderId = wo.WorkOrderId,
                            WorkOrderStartDate = wo.WorkOrderStartDate!=null ? (DateTime)wo.WorkOrderStartDate : (DateTime?)null,
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
                      Text = "[ " + co.CustomerOrderId + " ] - " +co.CustomerName
                });
            }
            return datas;
        }

        public void AddWorkOrder(WorkOrder workOrder)
        {
            appDbContext.WorkOrders.Add(workOrder);
            appDbContext.SaveChanges();
        }

        public WorkOrder GetWorkOrder(int workOrderId)
        {
            var wo = appDbContext.WorkOrders
                     .Where(x => x.WorkOrderId == workOrderId).FirstOrDefault();
            return wo;
        }
     
        public void EditWorkOrder(WorkOrder workOrder)
        {
            var _wo = appDbContext.WorkOrders
                              .Where(x => x.WorkOrderId == workOrder.WorkOrderId).FirstOrDefault();
            if (_wo != null)
            {
                _wo.WorkOrderStartDate = workOrder.WorkOrderStartDate;
                _wo.WorkOrderStatus = workOrder.WorkOrderStatus;
                _wo.StatusNote = workOrder.StatusNote;

                appDbContext.SaveChanges();
            }
            else
                throw new Record_Not_Found_Exception("Work Order Not Found !");
        }
     
        public void DeleteWorkOrder(int workOrderId)
        {
            var deletingWO = appDbContext.WorkOrders
                              .Where(x => x.WorkOrderId == workOrderId).FirstOrDefault();
            appDbContext.Remove(deletingWO);
            appDbContext.SaveChanges();
        }

        public string GetCustomerName(int workOrderId)
        {
            var customer = appDbContext.WorkOrders.Include(x => x.CustomerOrder)
                                .Where(x => x.WorkOrderId == workOrderId).FirstOrDefault();

            if (customer != null)
                return customer.CustomerOrder.CustomerName + "  [# " + customer.CustomerOrder.CustomerOrderId + " ]";
            else
                return null;
        }
    }
}
