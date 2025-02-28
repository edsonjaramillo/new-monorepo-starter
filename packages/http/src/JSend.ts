import type { Pagination } from './paginate';

export type ResponseStatus = 'success' | 'error' | 'warning' | 'info';

interface JSendSuccessResponse<T> {
  status: 'success';
  data: T; // Data is required and of type T for success
  message: string;
}

interface JSendInfoResponse<T> {
  status: 'info';
  data: T;
  message: string;
}

interface JSendErrorResponse {
  status: 'error';
  data?: undefined; // Data is optional and can be of any type for error (for error details)
  message: string;
}

interface JSendPaginationResponse<T> {
  status: 'success';
  data: T;
  pagination: Pagination;
  message: string;
}

// Define a union type for all possible JSend responses for broader type usage if needed
export type JSendResponse<T> =
  | JSendSuccessResponse<T>
  | JSendInfoResponse<T>
  | JSendErrorResponse
  | JSendPaginationResponse<T>;

export const JSend = {
  success<T>(data: T, message: string): JSendSuccessResponse<T> {
    return { status: 'success', data, message };
  },

  info<T>(data: T, message: string): JSendInfoResponse<T> {
    return { status: 'info', data, message };
  },

  error(message: string): JSendErrorResponse {
    return { status: 'error', message };
  },

  pagination<T>(data: T, pagination: Pagination, message: string): JSendPaginationResponse<T> {
    return { status: 'success', data, pagination, message };
  },
};
