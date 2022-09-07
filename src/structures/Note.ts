import FormData from 'form-data';
import { type Context } from '~/structures/Context';
import { getContentLength } from '~/util/getContentLength';

type NoteEditOptions = Readonly<Partial<{
  content: string,
  darkMode: boolean
}>>;
type ResolvedNoteEditOptions = Required<NoteEditOptions>;

type NoteData = Readonly<{
  id: string,
  darkMode: boolean,
  content: string,
  editedAt?: Date
}>;

class Note {
  readonly ['constructor']: typeof Note = Note;
  readonly #context: Context;
  readonly id: string;
  readonly darkMode: boolean;
  readonly content: string;
  readonly editedAt?: Date;

  constructor(
    context: Context,
    {
      id,
      darkMode,
      content,
      editedAt
    }: NoteData
  ) {
    this.#context = context;
    this.id = id;
    this.darkMode = darkMode;
    this.content = content;
    this.editedAt = editedAt;
  }

  #resolveAsOptions(contentOrOptions?: string | NoteEditOptions): ResolvedNoteEditOptions {
    const { darkMode, content } = this;

    if (!contentOrOptions) {
      return {
        darkMode,
        content
      };
    }

    if (typeof contentOrOptions === 'string') {
      return {
        darkMode,
        content: contentOrOptions
      };
    }

    return {
      content: contentOrOptions.content ?? content,
      darkMode: contentOrOptions.darkMode ?? darkMode
    };
  }

  async edit(): Promise<Note>;
  async edit(content: string): Promise<Note>;
  async edit(options: NoteEditOptions): Promise<Note>;
  async edit(contentOrOptions?: string | NoteEditOptions): Promise<Note> {
    const { content, darkMode } = this.#resolveAsOptions(contentOrOptions);
    const { axios, client } = this.#context;
    const form = new FormData();

    form.append('id', this.id);
    form.append('txt', content);

    if (darkMode) {
      form.append('edit', '');
      form.append('dark', '1');
    }

    await axios.post('http://plsk.net/edit.php', form, {
      headers: {
        'Content-Length': await getContentLength(form),
        ...form.getHeaders()
      }
    });

    return client.notes.fetch(this.id, { force: true });
  }
}

export {
  Note,
  type NoteData,
  type NoteEditOptions,
  type ResolvedNoteEditOptions
};
