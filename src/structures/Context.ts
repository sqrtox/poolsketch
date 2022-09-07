import { type AxiosInstance } from 'axios';
import { type Client } from '~/client/Client';

type ContextData = Readonly<{
  client: Client,
  axios: AxiosInstance
}>;

class Context {
  readonly client: Client;
  readonly axios: AxiosInstance;

  constructor({ client, axios }: ContextData) {
    this.client = client;
    this.axios = axios;
  }
}

export {
  Context,
  type ContextData
};
