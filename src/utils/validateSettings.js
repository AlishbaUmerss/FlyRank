const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_PATTERN = /^https?:\/\/.+\..+/
const NAME_PATTERN = /^[\p{L}\p{M}\s'-]+$/u

export const REPORT_FREQUENCIES = ['daily', 'weekly', 'monthly']

export const defaultSettings = {
  displayName: '',
  email: '',
  websiteUrl: '',
  company: '',
  reportFrequency: 'weekly',
  emailNotifications: true,
  bio: '',
}

export function validateField(name, value) {
  switch (name) {
    case 'displayName': {
      const trimmed = value.trim()
      if (!trimmed) return 'Display name is required.'
      if (trimmed.length < 2) return 'Display name must be at least 2 characters.'
      if (trimmed.length > 50) return 'Display name must be 50 characters or fewer.'
      if (!NAME_PATTERN.test(trimmed)) {
        return 'Display name can only contain letters, spaces, hyphens, and apostrophes.'
      }
      return ''
    }
    case 'email': {
      const trimmed = value.trim()
      if (!trimmed) return 'Email is required.'
      if (!EMAIL_PATTERN.test(trimmed)) return 'Enter a valid email address.'
      return ''
    }
    case 'websiteUrl': {
      const trimmed = value.trim()
      if (!trimmed) return 'Website URL is required.'
      if (!URL_PATTERN.test(trimmed)) {
        return 'Enter a valid URL starting with http:// or https://.'
      }
      return ''
    }
    case 'company': {
      if (value.trim().length > 100) return 'Company name must be 100 characters or fewer.'
      return ''
    }
    case 'reportFrequency': {
      if (!REPORT_FREQUENCIES.includes(value)) return 'Select a valid report frequency.'
      return ''
    }
    case 'bio': {
      if (value.length > 500) return 'Bio must be 500 characters or fewer.'
      return ''
    }
    default:
      return ''
  }
}

export function validateSettings(values) {
  const fields = [
    'displayName',
    'email',
    'websiteUrl',
    'company',
    'reportFrequency',
    'bio',
  ]

  return fields.reduce((errors, field) => {
    const message = validateField(field, values[field])
    if (message) errors[field] = message
    return errors
  }, {})
}
