import { type AxiosInstance } from 'axios';
import { NoteManager } from '~/managers/NoteManager';
import { Context } from '~/structures/Context';
import { createAxiosInstance } from '~/util/createAxiosInstance';

class Client {
  readonly #axios: AxiosInstance = createAxiosInstance();
  readonly notes: NoteManager;

  constructor() {
    const context = new Context({
      axios: this.#axios,
      client: this
    });

    this.notes = new NoteManager(context);
  }
}

export { Client };
