using Scheduler.Data.Data.Models;
using System.Linq.Expressions;

namespace Scheduler.Data.Interfaces
{
    public interface ISpecification<T>
        where T : BaseEntityModel
    {
        Expression<Func<T, bool>> Criteria { get; }

        List<Expression<Func<T, object>>> Includes { get; }
    }
}
