using EF.Core;
using EF.Core.DTO;
using EF.Core.Models;
using Microsoft.EntityFrameworkCore;
using Service.Interface;
using System;
using System.Collections;
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

        public CustomerOrderProgress GetCustomerOrderProgress(int cid)
        {
            CustomerOrderProgress data = new CustomerOrderProgress();
            data.CustomerOrder = null;
            data.WorkOrder = null;
            data.OperationDatas = new List<OperationData>();

            var co = appDbContext.CustomerOrders
                            .Where(x => x.CustomerOrderId == cid).FirstOrDefault();
            if (co != null)
            {
                data.CustomerOrder = co;

                var wo = appDbContext.WorkOrders
                            .Where(x => x.CustomerOrderId == co.CustomerOrderId).FirstOrDefault();
                if (wo != null)
                {
                    data.WorkOrder = wo;

                    var ops = appDbContext.Operations
                                .Where(x => x.WorkOrderId == wo.WorkOrderId);
                    if(ops!=null && ops.Count() > 0)
                    {
                        foreach(var op in ops)
                        {
                            OperationData opData = new OperationData();
                            opData.Operation = op;
                            opData.OperationHistory = new List<OperatorActivity>();
                            var oprs = appDbContext.OperatorActivities.Include(x=>x.Operator)
                                        .Where(x => x.OperationId == op.OperationId);
                            if(oprs!=null && oprs.Count() > 0)
                            {
                                foreach(var opr in oprs)
                                {
                                    opData.OperationHistory.Add(opr);
                                }                              
                            }

                            data.OperationDatas.Add(opData);
                        }
                    }
                }                
            }
            return data;
        }

        public List<OperationProgressChartData> GetOperationProgressForCustomerOrder(int cid)
        {
            List<OperationProgressChartData> data = new List<OperationProgressChartData>();
            
            var co = appDbContext.CustomerOrders.Include(x=>x.WorkOrder)
                            .Where(x => x.CustomerOrderId == cid).FirstOrDefault();

            if(co!=null && co.WorkOrder != null)
            {
                var ops = appDbContext.Operations
                            .Where(x => x.WorkOrderId == co.WorkOrder.WorkOrderId);
                if(ops!=null && ops.Count() > 0)
                {
                    foreach(var op in ops)
                    {
                        data.Add(new OperationProgressChartData()
                        {
                             OperationNumber = op.OperationNumber+"",
                              QtyDone = (op.OpQTYDone!=null ? (int)op.OpQTYDone : 0)
                        });
                    }                    
                }
            }
            return data;
        }
    }
}
