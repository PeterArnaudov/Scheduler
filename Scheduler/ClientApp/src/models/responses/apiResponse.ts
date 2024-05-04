import { BaseResponse } from "./baseResponse";

export interface ApiResponse<T> extends BaseResponse {
    data: T;
}