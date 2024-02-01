using Scheduler.Data.Data.Models;
using Scheduler.Data.Extensions;
using Scheduler.Data.Helpers;
using System.Linq.Expressions;

namespace Scheduler.Data.Specifications.Filter
{
    public class BooleanSpecification<T> : BaseSpecification<T>
        where T : BaseEntityModel
    {
        public BooleanSpecification(
            bool value,
            Expression<Func<T, object?>> propertyExpression)
        {
            var propertyName = propertyExpression.GetPropertyName();

            this.Criteria = GetCriteria(value, propertyName);
        }

        private Expression<Func<T, bool>> GetCriteria(
            bool value,
            string? propertyName)
        {
            var column = EFHelper.GetProperty<T, bool>(propertyName);

            return column.Compare(x => x == value);
        }
    }
}
