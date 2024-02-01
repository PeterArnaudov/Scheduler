using Microsoft.AspNetCore.Authorization;
using Scheduler.Authorization.Requirements;
using System.Security.Claims;

namespace Scheduler.Authorization.Handlers
{
    public class RoleAuthorizationHandler : AuthorizationHandler<RoleAuthorizationRequirement>
    {
        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            RoleAuthorizationRequirement requirement)
        {
            if (context.User.HasClaim(ClaimTypes.Role, requirement.Role))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
