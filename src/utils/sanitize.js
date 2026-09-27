import DOMPurify from 'dompurify'

export const sanitize = (dirty) => {
  if (!dirty) return ''
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
}
