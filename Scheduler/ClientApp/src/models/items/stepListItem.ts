import { ReactNode } from "react";

export interface StepListItem {
    title: string,
    description: string,
    children?: ReactNode[]
};