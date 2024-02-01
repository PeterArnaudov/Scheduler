using Microsoft.AspNetCore.Authorization;

namespace Scheduler.Authorization.Requirements
{
    public class RoleAuthorizationRequirement : IAuthorizationRequirement
    {
        public RoleAuthorizationRequirement(
            string role)
        {
            this.Role = role;
        }

        public string Role { get; set; }
    }
}
