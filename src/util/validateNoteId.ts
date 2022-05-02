type ValidateNoteId = (noteId: string) => asserts noteId is string

const validateNoteId: ValidateNoteId = noteId => {
  if (/[^\w-]/.test(noteId)) {
    throw new Error('Only single-byte alphanumeric characters, underscores, and hyphens can be used for id')
  }

  const noteIdLength = noteId.length

  if (noteIdLength < 6 || noteIdLength > 200) {
    throw new RangeError('The id must be between 6 and 200 characters')
  }
}

export {
  type ValidateNoteId,
  validateNoteId
}
