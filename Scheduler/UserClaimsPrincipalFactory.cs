using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Scheduler.Common.Constants;
using Scheduler.Models;
using System.Security.Claims;

namespace Scheduler
{
    public class UserClaimsPrincipalFactory : UserClaimsPrincipalFactory<ApplicationUser>
    {
        public UserClaimsPrincipalFactory(
            UserManager<ApplicationUser> userManager,
            IOptions<IdentityOptions> optionsAccessor)
            : base(userManager, optionsAccessor)
        {
        }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(
            ApplicationUser user)
        {
            ClaimsIdentity claims = await base.GenerateClaimsAsync(user);

            var roles = await UserManager.GetRolesAsync(user);
            var roleClaims = roles.Select(x => new Claim(ClaimTypes.Role, x));
            claims.AddClaims(roleClaims);

            if (!string.IsNullOrEmpty(user.ClinicId))
            {
                claims.AddClaim(new Claim(
                    ClaimNames.ClinicId,
                    user.ClinicId?.ToString() ?? string.Empty));
            }

            return claims;
        }
    }
}
