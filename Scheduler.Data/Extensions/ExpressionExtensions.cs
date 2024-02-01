using Scheduler.Data.Helpers;
using System.Linq.Expressions;
using System.Reflection;

namespace Scheduler.Data.Extensions
{
    public static class ExpressionExtensions
    {
        public static Expression<Func<T, TProp>> Or<T, TProp>(
            this Expression<Func<T, TProp>> left,
            Expression<Func<T, TProp>> right)
        {
            if (left == null) return right;

            var rightBody = CombineBody(left, right);

            var expression = Expression.OrElse(left.Body, rightBody);

            return Expression.Lambda<Func<T, TProp>>(expression, left.Parameters.FirstOrDefault());
        }

        public static Expression<Func<T, TProp>> And<T, TProp>(
            this Expression<Func<T, TProp>> left,
            Expression<Func<T, TProp>> right)
        {
            if (left == null) return right;

            var rightBody = CombineBody(left, right);

            var expression = Expression.AndAlso(left.Body, rightBody);

            return Expression.Lambda<Func<T, TProp>>(expression, left.Parameters.FirstOrDefault());
        }

        public static Expression<Func<T, TResult>> Execute<T, TProp, TResult>(
            this Expression<Func<T, TProp>> left,
            Expression<Func<TProp, TResult>> right)
        {
            return ExpressionReplacer.Extend(left, right);
        }

        public static Expression<Func<T, bool>> Compare<T, TProp>(
            this Expression<Func<T, TProp>> left,
            Expression<Func<TProp, bool>> right)
        {
            return ExpressionReplacer.Extend(left, right);
        }

        public static string? GetPropertyName<T, TProp>(
            this Expression<Func<T, TProp?>> propertyExpression)
        {
            LambdaExpression lambda = propertyExpression;
            MemberExpression memberExpression;

            if (lambda.Body is UnaryExpression)
            {
                var unaryExpression = (UnaryExpression)lambda.Body;
                memberExpression = (MemberExpression)unaryExpression.Operand;
            }
            else
            {
                memberExpression = (MemberExpression)lambda.Body;
            }

            return ((PropertyInfo)memberExpression.Member).Name;
        }

        private static Expression CombineBody<T, TProp>(
            this Expression<Func<T, TProp>> left,
            Expression<Func<T, TProp>> right)
        {
            return ExpressionReplacer.Replace(
                right.Body,
                right.Parameters.FirstOrDefault(),
                left.Parameters.FirstOrDefault());
        }
    }
}
