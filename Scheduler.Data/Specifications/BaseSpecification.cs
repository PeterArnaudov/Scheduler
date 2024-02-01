using Scheduler.Data.Data.Models;
using Scheduler.Data.Interfaces;
using System.Linq.Expressions;

namespace Scheduler.Data.Specifications
{
    /// <summary>
    /// Base Specification model for concrete specification models to inherit.
    /// That is specification in which the domain knowledge is hardcoded, with little or no possibility to alter it from the outside.
    /// </summary>
    /// <typeparam name="T">The type the specification is meant for.</typeparam>
    public abstract class BaseSpecification<T> : ISpecification<T>
        where T : BaseEntityModel
    {
        public BaseSpecification<T> And(ISpecification<T> specification)
        {
            return new AndSpecification<T>(this, specification);
        }

        /// <summary>
        /// Criteria by which models will be filtered.
        /// </summary>
        public Expression<Func<T, bool>> Criteria { get; set; }

        /// <summary>
        /// Includes allow for including children of children via eager load, e.g. Cart.Items.Product 
        /// </summary>
        public List<Expression<Func<T, object>>> Includes { get; set; }
            = new List<Expression<Func<T, object>>>();

        public virtual void AddInclude(Expression<Func<T, object>> expression)
        {
            this.Includes.Add(expression);
        }
    }
}
