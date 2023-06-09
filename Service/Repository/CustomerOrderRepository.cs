﻿using EF.Core;
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
            var _co = appDbContext.CustomerOrders.Include(x=>x.WorkOrder)
                              .Where(x => x.CustomerOrderId == customerOrder.CustomerOrderId).FirstOrDefault();
            if (_co != null)
            {
                if (_co.WorkOrder != null)
                {
                    if (customerOrder.OrderDate.Value.Date > _co.WorkOrder.WorkOrderStartDate.Value.Date)
                    {
                        throw new Invalid_WO_StartDate_Exception("WorkOrder-StartDate Must Be >= CustomerOrder-Date !");
                    }
                }
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

        public CustomerOrderProgressReportData GetCustomerOrderProgressReport(int cid)
        {
            CustomerOrderProgressReportData data = new CustomerOrderProgressReportData();
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

        public List<CustomerOrderProgressChartData> GetCustomerOrderProgressChart(int cid)
        {
            List<CustomerOrderProgressChartData> data = new List<CustomerOrderProgressChartData>();
            
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
                        int opNumber = op.OperationNumber;
                        var opString = (OperationNumber)opNumber;
                        string opName = opString.ToString();

                        data.Add(new CustomerOrderProgressChartData()
                        {
                             OperationNumber = op.OperationNumber+ " [" +opName + "]",
                              QtyDone = (op.OpQTYDone!=null ? (int)op.OpQTYDone : 0),
                               QtyRequired = (op.OpQTYRequired != null ? (int)op.OpQTYRequired : 0)
                        });
                    }                    
                }
            }
            return data;
        }
    }
}
