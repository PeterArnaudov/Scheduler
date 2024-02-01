using Microsoft.EntityFrameworkCore;
using Scheduler.Data.Data.Models;
using Scheduler.Data.Extensions;
using System.Linq.Expressions;

namespace Scheduler.Data.Specifications.Sort
{
    public class DateTimeSortSpecification<T> : BaseSortSpecification<T>
        where T : BaseEntityModel
    {
        public DateTimeSortSpecification(
            string propertyName,
            bool isAscending)
        {
            Criteria = x => EF.Property<DateTime>(x, propertyName);
            IsAscending = isAscending;
        }

        public DateTimeSortSpecification(
            Expression<Func<T, object?>> propertyExpression,
            bool isAscending)
        {
            var propertyName = propertyExpression.GetPropertyName();

            Criteria = x => EF.Property<DateTime>(x, propertyName);
            IsAscending = isAscending;
        }
    }
}
