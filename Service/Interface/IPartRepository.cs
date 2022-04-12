using EF.Core.DTO;
using EF.Core.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Interface
{
    public interface IPartRepository
    {
        Part GetPart(int partId);
        List<Part> GetAllParts();
        void EditPart(Part part);
        void DeletePart(int partId);
        void AddPart(Part part);
        List<SelectListItem> GetPartList();
        PartHistoryData GetPartHistory(int OperationId);
    }
}
