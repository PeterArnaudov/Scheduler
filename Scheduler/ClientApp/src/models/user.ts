import { User } from "oidc-client";

export interface SchedulerUser extends User {
    isAdmin?: boolean;
}