using Microsoft.EntityFrameworkCore;
using Scheduler.Data.Data.Models;

namespace Scheduler.Data.Specifications.Sort
{
    public class DecimalSortSpecification<T> : BaseSortSpecification<T>
        where T : BaseEntityModel
    {
        public DecimalSortSpecification(
            string propertyName,
            bool isAscending)
        {
            Criteria = x => EF.Property<decimal>(x, propertyName);
            IsAscending = isAscending;
        }
    }
}
