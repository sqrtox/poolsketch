import { type AxiosInstance } from 'axios'
import FormData from 'form-data'
import { fetchNote } from './util/fetchNote'
import { getContentLength } from './util/getContentLength'

type NoteEditOptions = Readonly<
  Partial<{
    darkMode: boolean
  }> & {
    content: string
  }
>
type ResolvedNoteEditOptions = Readonly<{
  darkMode: boolean
  content: string
}>

class Note {
  readonly #axios: AxiosInstance
  readonly id: string
  content: string
  darkMode: boolean

  constructor(axios: AxiosInstance, id: string, content: string, darkMode: boolean) {
    this.#axios = axios
    this.id = id
    this.content = content
    this.darkMode = darkMode
  }

  async fetch(): Promise<this> {
    const { content, darkMode } = await fetchNote(this.#axios, this.id)

    this.content = content
    this.darkMode = darkMode

    return this
  }

  #resolveNoteEditOptions(options: string | NoteEditOptions): ResolvedNoteEditOptions {
    const { darkMode } = this

    if (typeof options === 'string') {
      return {
        content: options,
        darkMode
      }
    }

    return {
      content: options.content,
      darkMode: options.darkMode ?? darkMode
    }
  }

  async edit(options: string | NoteEditOptions): Promise<this> {
    const { content, darkMode } = this.#resolveNoteEditOptions(options)
    const formData = new FormData()

    formData.append('id', this.id)
    formData.append('txt', content)

    if (darkMode) {
      formData.append('dark', '1')
    }

    const contentLength = await getContentLength(formData)

    await this.#axios.post('http://plsk.net/edit.php', formData, {
      headers: {
        'Content-Length': contentLength,
        ...formData.getHeaders()
      }
    })
    await this.fetch()

    return this
  }
}

export {
  type NoteEditOptions,
  Note
}
