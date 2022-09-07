import { Window } from 'happy-dom';
import { type Context } from '~/structures/Context';
import { Note, type NoteData } from '~/structures/Note';
import { validateNoteId } from '~/util/validateNoteId';

type NoteFetchOptions = Readonly<Partial<{
  force: boolean
}>>;

class NoteManager {
  readonly ['constructor']: typeof NoteManager = NoteManager;
  readonly #context: Context;

  constructor(context: Context) {
    this.#context = context;
  }

  readonly #cache = new Map<string, Note>();

  static #parseAsNoteData(data: string): NoteData {
    const { document } = new Window();

    document.documentElement.outerHTML = data;

    const idInput = document.getElementsByName('id')[0];
    const messageTextarea = document.getElementById('message');
    const darkCheckBox = document.getElementsByName('dark')[0];
    const editedTime = document.getElementsByTagName('div').filter(e => (
      /^最終更新日時: \d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/.test(e.textContent)
    ))[0];
    const editedAt = !editedTime ? undefined : new Date(`${editedTime.textContent.replace(/^最終更新日時: /, '')} GMT+0900`);

    return {
      id: idInput.getAttribute('value'),
      content: messageTextarea.textContent,
      darkMode: darkCheckBox.getAttribute('checked') === 'checked',
      editedAt
    };
  }

  async fetch(
    id: string,
    {
      force = false
    }: NoteFetchOptions = {}
  ): Promise<Note> {
    validateNoteId(id);

    const cache = this.#cache;

    if (!force) {
      const cached = cache.get(id);

      if (cached) {
        return cached;
      }
    }

    const context = this.#context;
    const { axios } = context;
    const { data } = await axios.get(`http://plsk.net/${id}`);
    const noteData = this.constructor.#parseAsNoteData(data);
    const note = new Note(context, noteData);

    cache.set(id, note);

    return note;
  }
}

export {
  type NoteFetchOptions,
  NoteManager
};
