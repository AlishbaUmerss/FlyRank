import { describe, expect, it } from 'vitest'
import { isValidSettings, validateSettings } from './validateSettings'

describe('validateSettings', () => {
  it('returns errors when all fields are empty', () => {
    const errors = validateSettings({
      fullName: '',
      email: '',
      notificationPreference: '',
    })

    expect(errors.fullName).toBeTruthy()
    expect(errors.email).toBeTruthy()
    expect(errors.notificationPreference).toBeTruthy()
  })

  it('rejects a full name shorter than 2 characters', () => {
    const errors = validateSettings({
      fullName: 'A',
      email: 'hello',
      notificationPreference: 'email',
    })

    expect(errors.fullName).toMatch(/at least 2 characters/i)
    expect(errors.email).toMatch(/valid email/i)
    expect(errors.notificationPreference).toBeUndefined()
  })

  it('accepts valid settings', () => {
    const values = {
      fullName: 'Alishba Umer',
      email: 'alishba@example.com',
      notificationPreference: 'email',
    }

    expect(validateSettings(values)).toEqual({})
    expect(isValidSettings(values)).toBe(true)
  })

  it('accepts no notifications as a valid preference', () => {
    const values = {
      fullName: 'Alishba Umer',
      email: 'alishba@example.com',
      notificationPreference: 'none',
    }

    expect(validateSettings(values)).toEqual({})
  })
})
