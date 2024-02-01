using Microsoft.EntityFrameworkCore;
using Scheduler.Data.Data.Models;
using Scheduler.Data.Enums;
using Scheduler.Data.Extensions;
using System.Linq.Expressions;

namespace Scheduler.Data.Specifications.Filter
{
    public class DateTimeSpecification<T> : BaseSpecification<T>
        where T : BaseEntityModel
    {
        public DateTimeSpecification(
            DateTime? value,
            string propertyName,
            DateFilterConditions condition = DateFilterConditions.Since)
        {
            this.Criteria = GetCriteria(value, propertyName, condition);
        }

        public DateTimeSpecification(
            DateTime? value,
            Expression<Func<T, object?>> propertyExpression,
            DateFilterConditions condition = DateFilterConditions.Since)
        {
            var propertyName = propertyExpression.GetPropertyName();

            this.Criteria = GetCriteria(value, propertyName, condition);
        }

        private Expression<Func<T, bool>> GetCriteria(
            DateTime? value,
            string? propertyName,
            DateFilterConditions condition)
        {
            switch (condition)
            {
                case DateFilterConditions.Since:
                    return x => EF.Property<DateTime?>(x, propertyName) >= value;
                case DateFilterConditions.Until:
                    return x => EF.Property<DateTime?>(x, propertyName) <= value;
                default:
                    return null;
            }
        }
    }
}
