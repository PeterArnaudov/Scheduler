using Scheduler.Data.Data.Models;
using Scheduler.Data.Interfaces;
using System.Linq.Expressions;

namespace Scheduler.Data.Specifications
{
    public abstract class BaseSortSpecification<T> : ISortSpecification<T>
        where T : BaseEntityModel
    {
        /// <summary>
        /// Criteria by which models will be sorted.
        /// </summary>
        public Expression<Func<T, object>> Criteria { get; set; }

        /// <summary>
        /// Defines whether the sort order will be ascending or descending.
        /// </summary>
        public bool? IsAscending { get; set; }

        /// <summary>
        /// Includes allow for including children of children via eager load, e.g. Cart.Items.Product 
        /// </summary>
        public List<Expression<Func<T, object>>> Includes { get; set; }
            = new List<Expression<Func<T, object>>>();

        protected virtual void AddInclude(Expression<Func<T, object>> expression)
        {
            this.Includes.Add(expression);
        }
    }
}
