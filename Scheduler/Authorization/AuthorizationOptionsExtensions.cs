using Microsoft.AspNetCore.Authorization;
using Scheduler.Authorization.Requirements;
using Scheduler.Constants;

namespace Scheduler.Authorization
{
    public static class AuthorizationOptionsExtensions
    {
        public static void AddPolicies(
            this AuthorizationOptions options)
        {
            options.AddPolicy(PolicyNames.Admin,
                policy =>
                {
                    policy.Requirements.Add(new RoleAuthorizationRequirement(RoleNames.Admin));
                });
            options.AddPolicy(PolicyNames.ClinicAdmin,
                policy =>
                {
                    policy.Requirements.Add(new RoleAuthorizationRequirement(RoleNames.ClinicAdmin));
                });
        }
    }
}
