namespace Scheduler.Services.Models.Responses
{
    public class BaseResponse
    {
        public bool Success { get; set; }

        public string? Message { get; set; }

        public int StatusCode { get; set; }

        public static BaseResponse Ok()
            => new()
            {
                Success = true,
                StatusCode = 200,
            };

        public static BaseResponse Fail(
            int statusCode = 400)
            => new()
            {
                Success = false,
                StatusCode = statusCode,
            };

        public static BaseResponse Fail(
            string? message,
            int statusCode = 400)
            => new()
            {
                Success = false,
                Message = message,
                StatusCode = statusCode,
            };
    }
}
