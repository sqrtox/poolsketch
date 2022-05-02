import { type AxiosInstance } from 'axios'
import { JSDOM } from 'jsdom'
import { validateNoteId } from './validateNoteId'
import { Note } from '../Note'

const fetchNote = async (axios: AxiosInstance, noteId: string): Promise<Note> => {
  validateNoteId(noteId)

  const { data } = await axios.get(`http://plsk.net/${noteId}`)
  const { window: { document, HTMLTextAreaElement, HTMLInputElement } } = new JSDOM(data)
  const txt = document.querySelector('textarea[name="txt"]')

  if (!(txt instanceof HTMLTextAreaElement)) {
    throw new Error('Could not retrieve content element')
  }

  const darkModeCheckbox = document.querySelector('input[name="dark"]')

  if (!(darkModeCheckbox instanceof HTMLInputElement)) {
    throw new Error('Could not get dark mode checkbox')
  }

  const darkMode = darkModeCheckbox.checked

  return new Note(axios, noteId, txt.value, darkMode)
}

export { fetchNote }
