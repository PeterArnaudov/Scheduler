using Microsoft.EntityFrameworkCore;
using Scheduler.Data.Data.Models;
using System.Linq.Expressions;

namespace Scheduler.Data.Helpers
{
    public static class EFHelper
    {
        public static Expression<Func<T, string?>> GetPropertyAsString<T>(
            string propertyName)
            where T : BaseEntityModel
        {
            var dataType = typeof(T).GetProperty(propertyName)?.PropertyType;

            Expression<Func<T, string?>> query;

            if (dataType?.Equals(typeof(string)) ?? false)
            {
                query = e => EF.Property<string>(e, propertyName);
            }
            else if (dataType?.Equals(typeof(int)) ?? false)
            {
                query = e => EF.Property<int>(e, propertyName).ToString();
            }
            else if (dataType?.Equals(typeof(decimal)) ?? false)
            {
                query = e => EF.Property<decimal>(e, propertyName).ToString();
            }
            else if (dataType?.Equals(typeof(DateTime)) ?? false)
            {
                query = e => EF.Property<DateTime>(e, propertyName).ToString();
            }
            else if (dataType?.Equals(typeof(bool)) ?? false)
            {
                query = e => EF.Property<bool>(e, propertyName).ToString();
            }
            else
            {
                query = e => EF.Property<object>(e, propertyName).ToString();
            }

            return query;
        }

        public static Expression<Func<TEntity, TOutput?>> GetProperty<TEntity, TOutput>(
            string propertyName)
            where TEntity : BaseEntityModel
        {
            var dataType = typeof(TEntity).GetProperty(propertyName)?.PropertyType;

            Expression<Func<TEntity, TOutput?>> query;

            query = e => EF.Property<TOutput>(e, propertyName);

            return query;
        }
    }
}
