import { ClientSideFetcher } from '@repo/http/fetcher/client';
import { ServerSideFetcher } from '@repo/http/fetcher/server';

export const $apiClientSide = new ClientSideFetcher('http://localhost:4000');
export const $apiServerSide = new ServerSideFetcher('http://localhost:4000');
