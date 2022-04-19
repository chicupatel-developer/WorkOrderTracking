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
    public class OperatorLogRepository : IOperatorLogRepository
    {
        private readonly WorkOrderTrackingContext appDbContext;
        public OperatorLogRepository(WorkOrderTrackingContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public List<SelectListItem> GetOperationList(int woid)
        {
            List<SelectListItem> datas = new List<SelectListItem>();

            foreach (var op in appDbContext.Operations.Where(x=>x.WorkOrderId==woid))
            {
                datas.Add(new SelectListItem()
                {
                    Value = op.OperationId.ToString(),
                    Text = "[ OP# " + op.OperationNumber + " ] "
                });
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

        public void AddOperatorLog(OperatorActivity operatorActivity)
        {
            // edit
            // check for any previously running operator log
            // operationstatus==0
            var opLog = appDbContext.OperatorActivities
                            // .Where(x => x.OperatorId == operatorActivity.OperatorId && x.OperationStatus == OperationStatusForOperator.Start_Running && x.WorkOrderId == operatorActivity.WorkOrderId && x.OperationId == operatorActivity.OperationId && x.OperationNumber == operatorActivity.OperationNumber).FirstOrDefault();
                            .Where(x => x.OperatorId == operatorActivity.OperatorId && x.OperationStatus == OperationStatusForOperator.Start_Running ).FirstOrDefault();
            if (opLog!=null)
            {
                opLog.OpQtyDone = operatorActivity.OpQtyDone;
                opLog.OperationStatus = operatorActivity.OperationStatus;
                opLog.OpPauseRunTime = operatorActivity.OpPauseRunTime;
            }
            // add
            else
            {
                var op_ = appDbContext.Operations
                          .Where(x => x.OperationId == operatorActivity.OperationId).FirstOrDefault();
                
                operatorActivity.OperationNumber = (OperationNumber)op_.OperationNumber;
                appDbContext.OperatorActivities.Add(operatorActivity);
            }
            appDbContext.SaveChanges();
        }

    }
}
