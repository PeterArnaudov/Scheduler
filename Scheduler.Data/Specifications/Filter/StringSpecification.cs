using Microsoft.EntityFrameworkCore;
using Scheduler.Data.Data.Models;
using Scheduler.Data.Enums;
using Scheduler.Data.Extensions;
using Scheduler.Data.Helpers;
using System.Linq.Expressions;

namespace Scheduler.Data.Specifications.Filter
{
    public class StringSpecification<T> : BaseSpecification<T>
        where T : BaseEntityModel
    {
        public StringSpecification(
            string? value,
            string propertyName,
            StringFilterConditions condition = StringFilterConditions.IsEqualTo)
        {
            this.Criteria = GetCriteria(value, propertyName, condition);
        }

        public StringSpecification(
            string? value,
            Expression<Func<T, object?>> propertyExpression,
            StringFilterConditions condition = StringFilterConditions.IsEqualTo)
        {
            var propertyName = propertyExpression.GetPropertyName();

            this.Criteria = GetCriteria(value, propertyName, condition);
        }

        public StringSpecification(
            string? value,
            IEnumerable<string>? propertyNames,
            StringFilterConditions condition = StringFilterConditions.IsEqualTo,
            LogicalOperator logicalOperator = LogicalOperator.And)
        {
            this.Criteria = GetCriteria(value, propertyNames, condition, logicalOperator);
        }

        public StringSpecification(
            IEnumerable<string?>? values,
            string propertyName,
            StringFilterConditions condition = StringFilterConditions.IsEqualTo,
            LogicalOperator logicalOperator = LogicalOperator.And)
        {
            this.Criteria = GetCriteria(values, propertyName, condition, logicalOperator);
        }

        public StringSpecification(
            IEnumerable<string?>? values,
            Expression<Func<T, object?>> propertyExpression,
            StringFilterConditions condition = StringFilterConditions.IsEqualTo,
            LogicalOperator logicalOperator = LogicalOperator.And)
        {
            var propertyName = propertyExpression.GetPropertyName();

            this.Criteria = GetCriteria(values, propertyName, condition, logicalOperator);
        }

        private Expression<Func<T, bool>> GetCriteria(
            string? value,
            string? propertyName,
            StringFilterConditions condition)
        {
            var column = EFHelper.GetPropertyAsString<T>(propertyName);

            switch (condition)
            {
                case StringFilterConditions.IsEqualTo:
                    return column.Compare(x => x == value);
                case StringFilterConditions.IsNotEqualTo:
                    return column.Compare(x => x != value);
                case StringFilterConditions.Contains:
                    return column.Compare(x => EF.Functions.Like(x, $"%{value}%"));
                default:
                    return null;
            }
        }

        private Expression<Func<T, bool>> GetCriteria(
            IEnumerable<string?>? values,
            string? propertyName,
            StringFilterConditions condition,
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

        private Expression<Func<T, bool>> GetCriteria(
            string? value,
            IEnumerable<string>? propertyNames,
            StringFilterConditions condition,
            LogicalOperator logicalOperator)
        {
            Expression<Func<T, bool>> complexQuery = p => logicalOperator == LogicalOperator.And;

            if (string.IsNullOrEmpty(value) || (propertyNames?.Any() ?? false))
            {
                return complexQuery;
            }

            foreach (var propertyName in propertyNames)
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
