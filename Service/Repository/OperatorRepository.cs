using EF.Core;
using EF.Core.Models;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Repository
{
    public class OperatorRepository : IOperatorRepository
    {
        private readonly WorkOrderTrackingContext appDbContext;
        public OperatorRepository(WorkOrderTrackingContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        public void AddOperator(Operator operator_)
        {            
            appDbContext.Operators.Add(operator_);
            appDbContext.SaveChanges();
        }
    }
}
