namespace Scheduler.Services.Models.Responses
{
    public class Result<T> : BaseResponse
    {
        public T? Data { get; set; }

        public static Result<T?> Ok(
            T? data)
            => new()
            {
                Success = true,
                Data = data
            };
    }
}
