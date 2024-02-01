using Scheduler.Data.Data.Models;
using System.Linq.Expressions;

namespace Scheduler.Data.Specifications
{
    /// <summary>
    /// Base expression specification model for concrete specification models to inherit.
    /// Can have any expression passed to it.
    /// Should stick to concrete specifications (<see cref="BaseSpecification{T}"/>).
    /// </summary>
    /// <typeparam name="T">The type the specification is meant for.</typeparam>
    public class BaseExpressionSpecification<T> : BaseSpecification<T>
        where T : BaseEntityModel
    {
        public BaseExpressionSpecification(
            Expression<Func<T, bool>> expression)
        {
            this.Criteria = expression;
        }
    }
}
