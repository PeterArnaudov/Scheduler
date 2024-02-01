using Scheduler.Data.Data.Models;
using Scheduler.Data.Helpers;
using Scheduler.Data.Interfaces;
using System.Linq.Expressions;

namespace Scheduler.Data.Specifications
{
    public class OrSpecification<T> : BaseSpecification<T>
        where T : BaseEntityModel
    {
        public OrSpecification(
            ISpecification<T> left,
            ISpecification<T> right)
        {
            var parameterExpression = Expression.Parameter(typeof(T));
            var expressionBody = Expression.Or(left.Criteria.Body, right.Criteria.Body);
            expressionBody = (BinaryExpression)new ParameterReplacer(parameterExpression).Visit(expressionBody);

            var finalExpression = Expression.Lambda<Func<T, bool>>(expressionBody, parameterExpression);

            this.Criteria = finalExpression;
        }

        public OrSpecification(
            params ISpecification<T>[] specifications)
        {
            if (specifications == null || specifications.Length < 2)
            {
                throw new ArgumentException("At least two specifications are required.");
            }

            var parameterExpression = Expression.Parameter(typeof(T));

            var orExpression = Expression.Or(
                specifications[0].Criteria.Body,
                specifications[1].Criteria.Body);

            for (int i = 2; i < specifications.Length; i++)
            {
                orExpression = Expression.Or(orExpression, specifications[i].Criteria.Body);
            }

            orExpression = (BinaryExpression)new ParameterReplacer(parameterExpression).Visit(orExpression);

            var finalExpression = Expression.Lambda<Func<T, bool>>(orExpression, parameterExpression);

            this.Criteria = finalExpression;
        }
    }
}
