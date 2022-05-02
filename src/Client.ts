import axiosStatic from 'axios'
import { fetchNote } from './util/fetchNote'
import { getUserAgent } from './util/getUserAgent'
import { type Note } from './Note'

class Client {
  readonly #axios = axiosStatic.create({
    headers: {
      'User-Agent': getUserAgent().toString()
    }
  })

  openNote(noteId: string): Promise<Note> {
    return fetchNote(this.#axios, noteId)
  }
}

export { Client }
