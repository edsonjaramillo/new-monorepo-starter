import type { Pagination } from './paginate';

export type ResponseStatus = 'success' | 'error' | 'warning' | 'info';

type RedirectData = {
  path: string;
};

export type JSendSuccess<T> = {
  status: 'success';
  data: T; // Data is required and of type T for success
  message: string;
};

export type JSendRedirect = {
  status: 'redirect';
  data: RedirectData;
  message: string;
  redirect: string;
};

export type JSendInfo<T> = {
  status: 'info';
  data: T;
  message: string;
};

export type JSendError = {
  status: 'error';
  data?: undefined; // Data is optional and can be of any type for error (for error details)
  message: string;
};

export type JSendPagination<T> = {
  status: 'success';
  data: T;
  pagination: Pagination;
  message: string;
};

export const JSend = {
  success<T>(data: T, message: string): JSendSuccess<T> {
    return { status: 'success', data, message };
  },

  info<T>(data: T, message: string): JSendInfo<T> {
    return { status: 'info', data, message };
  },

  error(message: string): JSendError {
    return { status: 'error', message };
  },

  redirect(path: string, message: string): JSendRedirect {
    return { status: 'redirect', data: { path }, message, redirect: path };
  },

  pagination<T>(data: T, pagination: Pagination, message: string): JSendPagination<T> {
    return { status: 'success', data, pagination, message };
  },
};
