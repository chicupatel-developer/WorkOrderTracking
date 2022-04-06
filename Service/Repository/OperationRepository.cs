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
    public class OperationRepository : IOperationRepository
    {
        private readonly WorkOrderTrackingContext appDbContext;
        public OperationRepository(WorkOrderTrackingContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public List<Operation> GetAllWorkOrderOperations()
        {
            List<Operation> datas = new List<Operation>();

            var ops_ = appDbContext.Operations;
            if (ops_ != null && ops_.Count() > 0)
            {
                datas = ops_.ToList();
            }    
            return datas;
        }

    }
}
