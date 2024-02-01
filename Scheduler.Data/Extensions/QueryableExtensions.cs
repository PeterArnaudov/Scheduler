using Microsoft.EntityFrameworkCore;
using Scheduler.Data.Data.Models;
using Scheduler.Data.Interfaces;
using System.Linq.Expressions;

namespace Scheduler.Data.Extensions
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> IncludeIf<T>(
            this IQueryable<T> source,
            bool condition,
            Expression<Func<T, object?>> navigationProperty)
            where T : class
        {
            if (condition)
            {
                // If the condition is true, include the navigation property
                return source.Include(navigationProperty);
            }
            else
            {
                // Otherwise, return the original IQueryable without including the navigation property
                return source;
            }
        }


        public static IQueryable<T> Specify<T>(
            this IQueryable<T> queryable,
            ISpecification<T> specification)
            where T : BaseEntityModel
        {
            // fetch a Queryable that includes all expression-based includes
            var queryableResultWithIncludes = specification.Includes.
                Aggregate(queryable,
                    (current, include) => current.Include(include));

            // return a query using the specification's criteria expression
            return queryableResultWithIncludes.Where(specification.Criteria);
        }

        public static IQueryable<T> Specify<T>(
            this IQueryable<T> queryable,
            params ISpecification<T>[] specifications)
            where T : BaseEntityModel
        {
            if (specifications is null
                || !specifications.Any())
            {
                return queryable;
            }

            foreach (var specification in specifications)
            {
                queryable = queryable.Specify(specification);
            }

            return queryable;
        }

        public static IQueryable<T> Sort<T>(
            this IQueryable<T> queryable,
            ISortSpecification<T>? specification)
            where T : BaseEntityModel
        {
            if (specification == null)
            {
                return queryable;
            }

            // fetch a Queryable that includes all expression-based includes
            var queryableResultWithIncludes = specification.Includes.
                Aggregate(queryable,
                    (current, include) => current.Include(include));

            // return a query using the specification's criteria expression
            return specification.IsAscending.HasValue
                && specification.IsAscending.Value
                ? queryableResultWithIncludes.OrderBy(specification.Criteria)
                : queryableResultWithIncludes.OrderByDescending(specification.Criteria);
        }

        public static IQueryable<T> Sort<T>(
            this IQueryable<T> queryable,
            IEnumerable<ISortSpecification<T>> specifications)
            where T : BaseEntityModel
        {
            if (specifications == null || !specifications.Any())
            {
                return queryable;
            }

            var queryableResultWithIncludes = queryable;

            var firstSpecification = specifications.FirstOrDefault();
            if (firstSpecification != null)
            {
                // fetch a Queryable that includes all expression-based includes
                queryableResultWithIncludes = firstSpecification.Includes
                    .Aggregate(queryableResultWithIncludes,
                        (current, include) => current.Include(include));

                // Apply primary sorting for the first specification
                var orderedQueryableResultWithIncludes = firstSpecification.IsAscending.HasValue && firstSpecification.IsAscending.Value
                    ? queryableResultWithIncludes.OrderBy(firstSpecification.Criteria)
                    : queryableResultWithIncludes.OrderByDescending(firstSpecification.Criteria);

                foreach (var specification in specifications.Skip(1))
                {
                    // Apply secondary sortings for other specifications
                    orderedQueryableResultWithIncludes = specification.IsAscending.HasValue && specification.IsAscending.Value
                        ? orderedQueryableResultWithIncludes.ThenBy(specification.Criteria)
                        : orderedQueryableResultWithIncludes.ThenByDescending(specification.Criteria);
                }

                queryableResultWithIncludes = orderedQueryableResultWithIncludes;
            }

            return queryableResultWithIncludes;
        }
    }
}
