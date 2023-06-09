﻿using EF.Core.DTO;
using EF.Core.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Interface
{
    public interface IOperatorLogRepository
    {
        List<SelectListItem> GetOperationList(int woid);
        List<SelectListItem> GetWorkOrderList();
        void AddOperatorLog(OperatorActivity operatorActivity);
        Operator GetOperator(string userId);
        OperationQtyData GetOperationQtyData(int opId);
        List<OperatorActivity> GetMyLogData(OperatorLogDataView logDataOptions);
    }
}
