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

                // if supervisor has not start_running this operationid then,,,
                // operator can not start_running this operationid
                if (op_.OperationStatus == OperationStatus.Start_Running)
                {
                    operatorActivity.OperationNumber = (OperationNumber)op_.OperationNumber;
                    appDbContext.OperatorActivities.Add(operatorActivity);
                    appDbContext.SaveChanges();
                }
                else
                    throw new Operator_CanNot_StartRun_OP_Exception("Operation Is Not [Start_Running] By Supervisor !");
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
                    // operator-activity
                    opLog.OpQtyDone = operatorActivity.OpQtyDone;
                    opLog.OperationStatus = operatorActivity.OperationStatus;
                    opLog.OpPauseRunTime = operatorActivity.OpPauseRunTime;
                    opLog.CycleTime = opLog.OpPauseRunTime.Value.Subtract(opLog.OpStartRunTime.Value);

                    // operation
                    // update OpQTYDone
                    var op = appDbContext.Operations
                                .Where(x => x.OperationId == opLog.OperationId).FirstOrDefault();
                    op.OpQTYDone += operatorActivity.OpQtyDone;

                    appDbContext.SaveChanges();
                }
                else
                    throw new Invalid_Operator_LogData_Exception("Invalid Log Data ! Please Make Sure WorkOrder & Operation Data !");
            
            }
        }

        public Operator GetOperator(string userId)
        {
            return appDbContext.Operators
                        .Where(x => x.UserId == userId).FirstOrDefault();            
        }

        public OperationQtyData GetOperationQtyData(int opId)
        {
            OperationQtyData data = new OperationQtyData();
            data.OperationId = opId;

            var op = appDbContext.Operations
                        .Where(x => x.OperationId == opId).FirstOrDefault();
            data.QtyDone = op.OpQTYDone==null ? 0 : (int)op.OpQTYDone;
            data.QtyRequired = op.OpQTYRequired==null ? 0 : (int)op.OpQTYRequired;
            return data;
        }

    }
}
