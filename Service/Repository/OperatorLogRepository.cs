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
            // run
            if (operatorActivity.OperationStatus == OperationStatusForOperator.Start_Running)
            {
                var opLog = appDbContext.OperatorActivities
                               .Where(x => x.OperatorId == operatorActivity.OperatorId && x.OperationStatus == OperationStatusForOperator.Start_Running).FirstOrDefault();
                if (opLog != null)
                    throw new Invalid_Operator_Action_Exception("Operator Log Is Already Running ! First Pause Previous Log, Then Run New Log !");

                var op_ = appDbContext.Operations
                        .Where(x => x.OperationId == operatorActivity.OperationId).FirstOrDefault();

                operatorActivity.OperationNumber = (OperationNumber)op_.OperationNumber;
                appDbContext.OperatorActivities.Add(operatorActivity);
                appDbContext.SaveChanges();
            }
            // pause
            else
            {
                var opLog = appDbContext.OperatorActivities
                             .Where(x => x.OperatorId == operatorActivity.OperatorId && x.OperationStatus == OperationStatusForOperator.Start_Running).FirstOrDefault();
                if (opLog == null)
                    throw new Invalid_Operator_Action_Exception("Operator Log Is Not Running ! First Run Your Log, Then Pause It !");

                // check for same workorderid, operationid
                if (opLog.WorkOrderId == operatorActivity.WorkOrderId && opLog.OperationId == operatorActivity.OperationId)
                {
                    opLog.OpQtyDone = operatorActivity.OpQtyDone;
                    opLog.OperationStatus = operatorActivity.OperationStatus;
                    opLog.OpPauseRunTime = operatorActivity.OpPauseRunTime;
                    opLog.CycleTime = opLog.OpPauseRunTime.Value.Subtract(opLog.OpStartRunTime.Value);
                    appDbContext.SaveChanges();
                }
                else
                    throw new Invalid_Operator_LogData_Exception("Invalid Log Data ! Please Make Sure WorkOrder & Operation Data !");
            
            }
        }

    }
}
