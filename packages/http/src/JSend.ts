import type { Pagination } from './paginate';

export type ResponseStatus = 'success' | 'error' | 'warning' | 'info';

type RedirectData = {
  path: string;
};

export type JSendSuccess<T> = {
  status: 'success';
  payload: T; // Data is required and of type T for success
  message: string;
};

export type JSendRedirect = {
  status: 'redirect';
  payload: RedirectData;
  message: string;
  redirect: string;
};

export type JSendInfo<T> = {
  status: 'info';
  payload: T;
  message: string;
};

export type JSendError = {
  status: 'error';
  payload?: undefined; // Data is optional and can be of any type for error (for error details)
  message: string;
};

export type JSendPagination<T> = {
  status: 'success';
  payload: T;
  pagination: Pagination;
  message: string;
};

export const JSend = {
  success<T>(payload: T, message: string): JSendSuccess<T> {
    return { status: 'success', payload, message };
  },

  info<T>(payload: T, message: string): JSendInfo<T> {
    return { status: 'info', payload, message };
  },

  error(message: string): JSendError {
    return { status: 'error', message };
  },

  redirect(path: string, message: string): JSendRedirect {
    return { status: 'redirect', payload: { path }, message, redirect: path };
  },

  pagination<T>(payload: T, pagination: Pagination, message: string): JSendPagination<T> {
    return { status: 'success', payload, pagination, message };
  },
};
