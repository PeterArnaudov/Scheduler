using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Scheduler.Data.Data.Models;
using Scheduler.Data.Enums;
using Scheduler.Data.Extensions;
using Scheduler.Data.Helpers;
using System.Linq.Expressions;

namespace Scheduler.Data.Specifications.Filter
{
    public class IntegerSpecification<T> : BaseSpecification<T>
        where T : BaseEntityModel
    {
        public IntegerSpecification(
            int? value,
            Expression<Func<T, object?>> propertyExpression,
            NumberFilterCondition condition = NumberFilterCondition.IsEqualTo)
        {
            var propertyName = propertyExpression.GetPropertyName();

            this.Criteria = GetCriteria(value, propertyName, condition);
        }

        public IntegerSpecification(
            IEnumerable<int?>? values,
            Expression<Func<T, object?>> propertyExpression,
            NumberFilterCondition condition = NumberFilterCondition.IsEqualTo,
            LogicalOperator logicalOperator = LogicalOperator.And)
        {
            var propertyName = propertyExpression.GetPropertyName();

            this.Criteria = GetCriteria(values, propertyName, condition, logicalOperator);
        }

        private Expression<Func<T, bool>> GetCriteria(
            int? value,
            string? propertyName,
            NumberFilterCondition condition)
        {
            var column = EFHelper.GetProperty<T, decimal>(propertyName);

            switch (condition)
            {
                case NumberFilterCondition.IsEqualTo:
                    return column.Compare(x => x == value);
                case NumberFilterCondition.IsHigherThan:
                    return column.Compare(x => x > value);
                case NumberFilterCondition.IsHigherThanOrEqual:
                    return column.Compare(x => x >= value);
                case NumberFilterCondition.IsLessThan:
                    return column.Compare(x => x < value);
                case NumberFilterCondition.IsLessThanOrEqual:
                    return column.Compare(x => x <= value);
                default:
                    return null;
            }
        }

        private Expression<Func<T, bool>> GetCriteria(
            IEnumerable<int?>? values,
            string? propertyName,
            NumberFilterCondition condition,
            LogicalOperator logicalOperator)
        {
            Expression<Func<T, bool>> complexQuery = p => logicalOperator == LogicalOperator.And;

            if (!values?.Any() ?? false)
            {
                return complexQuery;
            }

            foreach (var value in values)
            {
                var query = GetCriteria(value, propertyName, condition);

                complexQuery = GetComplexQuery(complexQuery, query, logicalOperator);
            }

            return complexQuery;
        }

        private Expression<Func<T, bool>> GetComplexQuery(
            Expression<Func<T, bool>> initialQuery,
            Expression<Func<T, bool>>? additionalQuery,
            LogicalOperator logicalOperator)
        {
            if (additionalQuery == null)
            {
                return initialQuery;
            }

            return logicalOperator switch
            {
                LogicalOperator.And
                    => initialQuery.And(additionalQuery),
                LogicalOperator.Or
                    => initialQuery.Or(additionalQuery),
                _ => initialQuery
            };
        }
    }
}
