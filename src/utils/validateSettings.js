const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const NOTIFICATION_OPTIONS = ['email', 'none']

export function validateSettings({ fullName, email, notificationPreference }) {
  const errors = {}

  const trimmedName = fullName.trim()
  if (!trimmedName) {
    errors.fullName = 'Full name is required.'
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.'
  }

  const trimmedEmail = email.trim()
  if (!trimmedEmail) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!notificationPreference) {
    errors.notificationPreference = 'Please select a notification preference.'
  } else if (!NOTIFICATION_OPTIONS.includes(notificationPreference)) {
    errors.notificationPreference =
      'Please select a valid notification preference.'
  }

  return errors
}

export function isValidSettings(values) {
  return Object.keys(validateSettings(values)).length === 0
}
