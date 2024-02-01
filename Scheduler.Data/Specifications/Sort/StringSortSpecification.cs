using Microsoft.EntityFrameworkCore;
using Scheduler.Data.Data.Models;

namespace Scheduler.Data.Specifications.Sort
{
    public class StringSortSpecification<T> : BaseSortSpecification<T>
        where T : BaseEntityModel
    {
        public StringSortSpecification(
            string propertyName,
            bool isAscending)
        {
            Criteria = x => EF.Property<string>(x, propertyName);
            IsAscending = isAscending;
        }
    }
}
