using System.Linq.Expressions;

namespace Scheduler.Data.Helpers
{
    public class ParameterReplacer : ExpressionVisitor
    {
        private readonly ParameterExpression parameterExpression;

        protected override Expression VisitParameter(ParameterExpression node)
            => base.VisitParameter(parameterExpression);

        public ParameterReplacer(ParameterExpression parameterExpression)
        {
            this.parameterExpression = parameterExpression;
        }
    }
}
