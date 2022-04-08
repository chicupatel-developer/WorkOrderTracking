using EF.Core;
using EF.Core.DTO;
using EF.Core.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Service.Repository
{
    public class OperationRepository : IOperationRepository
    {
        private readonly WorkOrderTrackingContext appDbContext;
        public OperationRepository(WorkOrderTrackingContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public List<Operation> GetAllWorkOrderOperations(int woid)
        {
            List<Operation> datas = new List<Operation>();

            var ops_ = appDbContext.Operations
                            .Where(x=>x.WorkOrderId==woid);
            if (ops_ != null && ops_.Count() > 0)
            {
                datas = ops_.ToList();
            }    
            return datas;
        }

        public List<SelectListItem> GetWorkOrderList()
        {
            List<SelectListItem> datas = new List<SelectListItem>();

            foreach (var wo in appDbContext.WorkOrders.Include(x=>x.CustomerOrder))
            {
                datas.Add(new SelectListItem()
                {
                    Value = wo.WorkOrderId.ToString(),
                    Text = "[ WO# " + wo.WorkOrderId + " ] - " + "[ CUST_ORD# " + wo.CustomerOrderId + " - " + wo.CustomerOrder.CustomerName + " ]"                    
                });
            }
            return datas;
        }

        public bool AddOperation(Operation operation)
        {
            appDbContext.Operations.Add(operation);
            appDbContext.SaveChanges();

            return true;
        }

        public Operation GetOperation(int operationId)
        {
            var op = appDbContext.Operations
                     .Where(x => x.OperationId == operationId).FirstOrDefault();
            return op;
        }
        public void EditOperation(Operation operation)
        {
            var _op = appDbContext.Operations
                                  .Where(x => x.OperationId == operation.OperationId).FirstOrDefault();
            if (_op != null)
            {

                // check for OpStatus and OpStartDate
                if (operation.OperationStartDate == null && operation.OperationStatus != OperationStatus.Not_Started)
                    throw new OpStatus_OpStartDate_Exception("[Operation Start Date - Operation Status] Data Invalid !");

                _op.OperationStartDate = operation.OperationStartDate;
                _op.OperationStatus = operation.OperationStatus;
                _op.Details = operation.Details;

                appDbContext.SaveChanges();
            }
        }
    }
}
