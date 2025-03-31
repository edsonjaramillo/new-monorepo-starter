import type { JSendError, JSendSuccess } from '../JSend';

export type ServerPingResponse = JSendError | JSendSuccess<undefined>;
export type RedisPingResponse = JSendError | JSendSuccess<undefined>;
export type DatabasePingResponse = JSendError | JSendSuccess<undefined>;
