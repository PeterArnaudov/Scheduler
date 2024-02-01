using Scheduler.Data.Data.Models;
using System.Linq.Expressions;

namespace Scheduler.Data.Interfaces
{
    public interface ISortSpecification<T>
        where T : BaseEntityModel
    {
        Expression<Func<T, object>> Criteria { get; }

        public bool? IsAscending { get; set; }

        List<Expression<Func<T, object>>> Includes { get; }
    }
}
