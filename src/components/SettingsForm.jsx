import { useRef, useState } from 'react'
import { validateSettings } from '../utils/validateSettings'
import '../App.css'

const INITIAL_VALUES = {
  fullName: '',
  email: '',
  notificationPreference: '',
}

function SettingsForm() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const fullNameRef = useRef(null)
  const emailRef = useRef(null)
  const notificationRef = useRef(null)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setSuccessMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateSettings(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSuccessMessage('')

      if (nextErrors.fullName) {
        fullNameRef.current?.focus()
      } else if (nextErrors.email) {
        emailRef.current?.focus()
      } else if (nextErrors.notificationPreference) {
        notificationRef.current?.focus()
      }
      return
    }

    setErrors({})
    setSuccessMessage('Your settings have been saved successfully.')
  }

  function handleReset() {
    setValues(INITIAL_VALUES)
    setErrors({})
    setSuccessMessage('')
    fullNameRef.current?.focus()
  }

  return (
    <section className="settings-page" aria-labelledby="settings-heading">
      <header className="settings-header">
        <h1 id="settings-heading">Settings</h1>
        <p>Update your profile and notification preferences.</p>
      </header>

      <form className="settings-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="fullName">Full Name</label>
          <input
            ref={fullNameRef}
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={handleChange}
            aria-invalid={errors.fullName ? 'true' : undefined}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className="field-error" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="field-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <fieldset
          className="form-field"
          aria-invalid={errors.notificationPreference ? 'true' : undefined}
          aria-describedby={
            errors.notificationPreference ? 'notification-error' : undefined
          }
        >
          <legend>Notification Preference</legend>
          <div className="radio-group">
            <label className="radio-option">
              <input
                ref={notificationRef}
                type="radio"
                name="notificationPreference"
                value="email"
                checked={values.notificationPreference === 'email'}
                onChange={handleChange}
              />
              Email notifications
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="notificationPreference"
                value="none"
                checked={values.notificationPreference === 'none'}
                onChange={handleChange}
              />
              No notifications
            </label>
          </div>
          {errors.notificationPreference && (
            <p id="notification-error" className="field-error" role="alert">
              {errors.notificationPreference}
            </p>
          )}
        </fieldset>

        {successMessage && (
          <p className="success-message" role="status" aria-live="polite">
            {successMessage}
          </p>
        )}

        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </section>
  )
}

export default SettingsForm
