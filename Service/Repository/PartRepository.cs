﻿using Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using EF.Core.Models;
using EF.Core;
using System.Linq;
using EF.Core.DTO;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Service.Utils;

namespace Service.Repository
{
    public class PartRepository : IPartRepository
    {
        private readonly WorkOrderTrackingContext appDbContext;
        public PartRepository(WorkOrderTrackingContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public Part GetPart(int partId)
        {
            var part = appDbContext.Parts
                            .Where(x => x.PartId == partId).FirstOrDefault();
            return part;
        }

        public List<Part> GetAllParts()
        {
            List<Part> datas = new List<Part>();
            List<string> partFilesFromHD = PartFilesFromHDUtil.GetPartFilesFromHD();

            var parts_ = appDbContext.Parts;
            if (parts_ != null && parts_.Count() > 0)
            {
                foreach(var part_ in parts_)
                {
                    if(!partFilesFromHD.Any(x => x == part_.PartFile))
                        part_.PartFile = "N/A";
                    
                    datas.Add(part_);
                }
            }               
            return datas;
        }

        public void EditPart(Part part)
        {
            var _part = appDbContext.Parts
                              .Where(x => x.PartId == part.PartId).FirstOrDefault();
            if (_part != null)
            {
                _part.Name = part.Name;
                _part.Desc = part.Desc;
                _part.Qty = part.Qty;

                appDbContext.SaveChanges();
            }
            else
                throw new Record_Not_Found_Exception("Part Not Found !");
        }
        
        public void DeletePart(int partId)
        {
            var deletingPart = appDbContext.Parts
                                .Where(x => x.PartId == partId).FirstOrDefault();
            appDbContext.Remove(deletingPart);
            appDbContext.SaveChanges();
        }

        public void AddPart(Part part)
        {
            appDbContext.Parts.Add(part);
            appDbContext.SaveChanges();
        }

        public List<SelectListItem> GetPartList()
        {
            List<SelectListItem> datas = new List<SelectListItem>();

            foreach (var p in appDbContext.Parts)
            {
                datas.Add(new SelectListItem()
                {
                    Value = p.PartId.ToString(),
                    Text = "[ " + p.PartId + " ] - " + p.Name + " [ Ava. Qty. : " + p.Qty + " ]"
                });
            }
            return datas;
        }

        public PartHistoryData GetPartHistory(int operationId)
        {
            PartHistoryData data = new PartHistoryData();
            data.OperationId = operationId;
            data.PartList = new List<PartData>();

            var op_ = appDbContext.Operations.Include(x => x.WorkOrder)
                              .Where(x => x.OperationId == operationId).FirstOrDefault();
            if (op_ != null)
            {
                data.OperationNumber = op_.OperationNumber;
                data.WorkOrderId = op_.WorkOrder.WorkOrderId;
            }
            
            var operationToParts = appDbContext.OperationToParts.Include(x=>x.Part)
                                    .Where(x => x.OperationId == operationId);
            if(operationToParts!=null && operationToParts.Count() > 0)
            {
                foreach(var opToPart in operationToParts)
                {
                    var part_ = appDbContext.Parts
                                    .Where(x => x.PartId == opToPart.PartId);
                    if (part_ != null)
                    {
                        data.PartList.Add(new PartData()
                        {
                             PartId = part_.FirstOrDefault().PartId,
                              PartName = part_.FirstOrDefault().Name,
                               XFERQTY = (int)opToPart.XFERQTY
                        });
                    }
                }
            }
            return data;
        }

        public void UpdatePartFile(int partId, string partFileName)
        {
            var part = appDbContext.Parts
                            .Where(x => x.PartId == partId).FirstOrDefault();
            part.PartFile = partFileName;
            appDbContext.SaveChanges();
        }
    }
}
