using Microsoft.AspNetCore.Http;
using Scheduler.Common.Constants;

namespace Scheduler.Services.Helpers
{
    public static class ClinicIdHelper
    {
        private static readonly IHttpContextAccessor httpContextAccessor;

        static ClinicIdHelper()
        {
            httpContextAccessor = new HttpContextAccessor();
        }

        public static bool TryGetCurrentClinicId(out string clinicId)
        {
            var claims = httpContextAccessor?.HttpContext?.User?.Claims;
            var clinicIdClaim = claims?.FirstOrDefault(c => c.Type == ClaimNames.ClinicId);
            clinicId = clinicIdClaim?.Value;

            if (string.IsNullOrEmpty(clinicId))
            {
                return false;
            }

            return true;
        }
    }
}
