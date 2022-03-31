using Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using EF.Core.Models;
using EF.Core;
using System.Linq;

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

            var parts_ = appDbContext.Parts;
            if (parts_ != null && parts_.Count() > 0)
                datas = parts_.ToList();

            return datas;
        }
    }
}
