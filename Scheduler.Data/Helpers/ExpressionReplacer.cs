using System.Linq.Expressions;

namespace Scheduler.Data.Helpers
{
    public class ExpressionReplacer : ExpressionVisitor
    {
        private readonly Expression From;
        private readonly Expression To;

        private ExpressionReplacer(Expression from, Expression to)
        {
            From = from;
            To = to;
        }

        public override Expression Visit(Expression node)
        {
            if (ReferenceEquals(node, From))
            {
                return To;
            }

            return base.Visit(node);
        }

        public static T Replace<T>(T target, Expression from, Expression to)
            where T : Expression
        {
            var replacer = new ExpressionReplacer(from, to);
            return (T)replacer.Visit(target);
        }

        public static Expression<Func<T, TProp2>> Extend<T, TProp1, TProp2>(
            Expression<Func<T, TProp1>> left,
            Expression<Func<TProp1, TProp2>> right)
        {
            var body = Replace(right.Body, right.Parameters.FirstOrDefault(), left.Body);

            return Expression.Lambda<Func<T, TProp2>>(body, left.Parameters);
        }
    }
}
