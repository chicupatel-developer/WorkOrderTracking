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

        public void AddOperation(Operation operation)
        {
            var data_ = appDbContext.Operations
                            .Where(x => x.WorkOrderId == operation.WorkOrderId);
            if(data_!=null && data_.Count() > 0)
            {
                var result = data_.Any(x => x.OperationNumber==operation.OperationNumber);
                if (result)
                    throw new WO_OP_Unique_Exception("[Duplicate Operation For This WorkOrder] Data Invalid !");                                
            }
            operation.OpQTYRequired = 0;
            operation.OpQTYDone = 0;
            appDbContext.Operations.Add(operation);
            appDbContext.SaveChanges();
        }

        public Operation GetOperation(int operationId)
        {
            var op = appDbContext.Operations
                     .Where(x => x.OperationId == operationId).FirstOrDefault();
            return op;
        }
        
        public void EditOperation(Operation operation)
        {
            var _op = appDbContext.Operations.Include(x=>x.WorkOrder)
                                  .Where(x => x.OperationId == operation.OperationId).FirstOrDefault();
            if (_op != null)
            {
                // operation can not be completed until start_running first
                if (operation.OperationStatus == OperationStatus.Completed && _op.OperationStatus == OperationStatus.Not_Started)
                    throw new OP_CanNot_Completed_Exception("Operation Can Not Be [Completed] !");

                if(operation.OperationStatus==OperationStatus.Completed && _op.OpQTYDone<_op.OpQTYRequired )
                    throw new OP_CanNot_Completed_Exception("Operation Can Not Be [Completed] ! QTY Done < QTY Required !");

                // check for it's parent workorder status
                if (operation.OperationStatus != OperationStatus.Not_Started && _op.WorkOrder.WorkOrderStatus != WorkOrderStatus.Start_Running)
                    throw new OP_CanNot_Start_Running_Exception("WorkOrder Status Is Not [Start_Runing] !");

                if (!(_op.OperationStartDate == null && _op.OperationStatus == OperationStatus.Not_Started))
                {
                    if (operation.OperationStartDate == null && operation.OperationStatus == OperationStatus.Not_Started)
                        throw new OP_CanNot_Not_Started_Exception("Operation Can Not Be [Not_Started] !");
                    else
                    {
                        if (operation.OperationStartDate == null)
                            throw new OpStatus_OpStartDate_Exception("[Operation Start Date - Operation Status] Data Invalid !");
                        if (operation.OperationStatus == OperationStatus.Not_Started)
                            throw new OP_CanNot_Not_Started_Exception("Operation Can Not Be [Not_Started] !");
                    }
                }

                if (_op.OperationStartDate == null && _op.OperationStatus == OperationStatus.Not_Started)
                {
                    if (operation.OperationStartDate == null && operation.OperationStatus == OperationStatus.Not_Started)
                    {
                        // ok
                    }
                    else
                    {
                        if (operation.OperationStartDate != null && operation.OperationStatus != OperationStatus.Not_Started)
                        {
                            // ok
                        }
                        else
                            throw new OpStatus_OpStartDate_Exception("[Operation Start Date - Operation Status] Data Invalid !");
                    }
                }

                // check for operation's start date and it's workorder's start date
                // workorder-startdate<=operations'-startdate                
                if (operation.OperationStartDate!=null && (_op.WorkOrder.WorkOrderStartDate > operation.OperationStartDate))
                    throw new Invalid_OP_StartDate_Exception("Operation StartDate Must Be >= WorkOrder StartDate !");

                // check for OpQTYDone >= OpQTYRequired 
                if (operation.OperationStatus == OperationStatus.Completed && _op.OpQTYDone < _op.OpQTYRequired)
                    throw new Invalid_OP_Status_Exception("Operation Can Not Be [Completed] !");


                _op.OperationStartDate = operation.OperationStartDate;
                _op.OperationStatus = operation.OperationStatus;
                _op.Details = operation.Details;
                if (operation.OpQTYRequired != null)
                    _op.OpQTYRequired = operation.OpQTYRequired;
                else
                    _op.OpQTYRequired = 0;

               
                appDbContext.SaveChanges();
            }
            else
                throw new Record_Not_Found_Exception("[Work Order - Operation] Not Found !");
        }

        public void XferPartsForOperation(OperationToPart operationToPart)
        {
            var part_ = appDbContext.Parts
                            .Where(x => x.PartId == operationToPart.PartId).FirstOrDefault();
            if (part_ == null)
                throw new Record_Not_Found_Exception("Part Not Found !");


            var operation_ = appDbContext.Operations
                          .Where(x => x.OperationId == operationToPart.OperationId).FirstOrDefault();
            if (operation_ == null)
                throw new Record_Not_Found_Exception("[Work Order - Operation] Not Found !");


            if ((part_.Qty - operationToPart.XFERQTY) < 0)
                throw new Not_Enough_QTY_Exception("QTY @ Warehouse Is Not Enough !");


            var data_ = appDbContext.OperationToParts
                           .Where(x => x.OperationId == operationToPart.OperationId && x.PartId == operationToPart.PartId);
            if (data_ != null && data_.Count() > 0)
            {
                // need to update XFERQTY @ OperationToParts db table
                // 1
                data_.FirstOrDefault().XFERQTY += operationToPart.XFERQTY;

                // throw new OP_Part_Unique_Exception("[Duplicate Part For This Operation] Data Invalid !");
            }
            else
            {
                // 1
                // add @ OperationToParts db table
                appDbContext.OperationToParts.Add(operationToPart);
            }                     

            // 2
            part_.Qty -= operationToPart.XFERQTY;

            appDbContext.SaveChanges();
        }
        
        public XferInfo GetOperationDetails(int operationId)
        {
            XferInfo data = new XferInfo();

            var op = appDbContext.Operations.Include(x => x.WorkOrder).Include(y => y.WorkOrder.CustomerOrder)
                            .Where(z => z.OperationId == operationId).FirstOrDefault();

            if(op!=null)
            {
                data.CustomerName = op.WorkOrder.CustomerOrder.CustomerName;
                data.CustomerOrderId = (int)op.WorkOrder.CustomerOrderId;
                data.CustomerOrderQTY = (int)op.WorkOrder.CustomerOrder.OrderQuantity;
                data.OperationNumber = op.OperationNumber;
                data.WorkOrderId = (int)op.WorkOrderId;
            }
            return data;
        }

        public OperationLog GetOperationLogData(int opid)
        {
            OperationLog data = new OperationLog();
            data.OperationId = opid;
            var op = appDbContext.Operations.Include(x => x.WorkOrder)
                                    .Where(x => x.OperationId == opid).FirstOrDefault();
            data.OperationNumber = op.OperationNumber;
            data.WorkOrderId = (int)op.WorkOrderId;

            data.OperationHistory = new List<HistoryData>();

            var opLog = appDbContext.OperatorActivities
                            .Where(x => x.OperationId == opid);
            if (opLog != null && opLog.Count() > 0)
            {
                foreach (var opl in opLog)
                {
                    data.OperationHistory.Add(new HistoryData()
                    {
                        CycleTime = (TimeSpan)opl.CycleTime,
                        OperatorId = (int)opl.OperatorId,
                        OpPauseRunTime = (DateTime)opl.OpPauseRunTime,
                        OpStartRunTime = (DateTime)opl.OpStartRunTime,
                        QtyDone = (int)opl.OpQtyDone
                    });
                }
            }
            return data;
        }
    }
}
