import { useState } from 'react'
import {
  defaultSettings,
  REPORT_FREQUENCIES,
  validateField,
  validateSettings,
} from '../utils/validateSettings'
import './SettingsForm.css'

const FREQUENCY_LABELS = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
}

function SettingsForm() {
  const [values, setValues] = useState(defaultSettings)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitStatus, setSubmitStatus] = useState(null)

  function handleChange(event) {
    const { name, type, checked, value } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setValues((current) => ({ ...current, [name]: nextValue }))
    setSubmitStatus(null)

    if (touched[name]) {
      setErrors((current) => ({
        ...current,
        [name]: validateField(name, nextValue),
      }))
    }
  }

  function handleBlur(event) {
    const { name, type, checked, value } = event.target
    const fieldValue = type === 'checkbox' ? checked : value

    setTouched((current) => ({ ...current, [name]: true }))
    setErrors((current) => ({
      ...current,
      [name]: validateField(name, fieldValue),
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateSettings(values)
    setErrors(nextErrors)
    setTouched({
      displayName: true,
      email: true,
      websiteUrl: true,
      company: true,
      reportFrequency: true,
      bio: true,
    })

    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus({ type: 'error', message: 'Fix the highlighted fields before saving.' })
      return
    }

    setSubmitStatus({
      type: 'success',
      message: 'Settings saved successfully.',
    })
  }

  function handleReset() {
    setValues(defaultSettings)
    setErrors({})
    setTouched({})
    setSubmitStatus(null)
  }

  return (
    <section className="settings" aria-labelledby="settings-heading">
      <header className="settings__header">
        <h1 id="settings-heading">Settings</h1>
        <p>Manage your FlyRank profile and reporting preferences.</p>
      </header>

      {submitStatus && (
        <div
          className={`settings__banner settings__banner--${submitStatus.type}`}
          role="status"
        >
          {submitStatus.message}
        </div>
      )}

      <form className="settings__form" onSubmit={handleSubmit} noValidate>
        <fieldset className="settings__fieldset">
          <legend>Profile</legend>

          <div className="settings__field">
            <label htmlFor="displayName">Display name</label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              autoComplete="name"
              value={values.displayName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.displayName)}
              aria-describedby={errors.displayName ? 'displayName-error' : undefined}
            />
            {errors.displayName && (
              <p id="displayName-error" className="settings__error" role="alert">
                {errors.displayName}
              </p>
            )}
          </div>

          <div className="settings__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="settings__error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="settings__field">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? 'company-error' : undefined}
            />
            {errors.company && (
              <p id="company-error" className="settings__error" role="alert">
                {errors.company}
              </p>
            )}
          </div>

          <div className="settings__field">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.bio)}
              aria-describedby="bio-hint bio-error"
            />
            <p id="bio-hint" className="settings__hint">
              {values.bio.length}/500 characters
            </p>
            {errors.bio && (
              <p id="bio-error" className="settings__error" role="alert">
                {errors.bio}
              </p>
            )}
          </div>
        </fieldset>

        <fieldset className="settings__fieldset">
          <legend>Site &amp; reporting</legend>

          <div className="settings__field">
            <label htmlFor="websiteUrl">Website URL</label>
            <input
              id="websiteUrl"
              name="websiteUrl"
              type="url"
              placeholder="https://example.com"
              value={values.websiteUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.websiteUrl)}
              aria-describedby={errors.websiteUrl ? 'websiteUrl-error' : undefined}
            />
            {errors.websiteUrl && (
              <p id="websiteUrl-error" className="settings__error" role="alert">
                {errors.websiteUrl}
              </p>
            )}
          </div>

          <div className="settings__field">
            <label htmlFor="reportFrequency">Report frequency</label>
            <select
              id="reportFrequency"
              name="reportFrequency"
              value={values.reportFrequency}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.reportFrequency)}
              aria-describedby={
                errors.reportFrequency ? 'reportFrequency-error' : undefined
              }
            >
              {REPORT_FREQUENCIES.map((frequency) => (
                <option key={frequency} value={frequency}>
                  {FREQUENCY_LABELS[frequency]}
                </option>
              ))}
            </select>
            {errors.reportFrequency && (
              <p id="reportFrequency-error" className="settings__error" role="alert">
                {errors.reportFrequency}
              </p>
            )}
          </div>

          <div className="settings__field settings__field--checkbox">
            <label htmlFor="emailNotifications">
              <input
                id="emailNotifications"
                name="emailNotifications"
                type="checkbox"
                checked={values.emailNotifications}
                onChange={handleChange}
              />
              Send email notifications for ranking updates
            </label>
          </div>
        </fieldset>

        <div className="settings__actions">
          <button type="submit" className="settings__button settings__button--primary">
            Save settings
          </button>
          <button
            type="button"
            className="settings__button settings__button--secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  )
}

export default SettingsForm
