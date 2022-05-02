import type FormData from 'form-data'

const getContentLength = (formData: FormData) => (
  new Promise<number>((resolve, reject) => formData.getLength((err, length) => {
    if (err) {
      reject(err)

      return
    }

    resolve(length)
  }))
)

export { getContentLength }
