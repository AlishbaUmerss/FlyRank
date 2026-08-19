import { cleanup,render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach,describe, expect, it } from 'vitest'
import SettingsForm from './SettingsForm'

describe('SettingsForm', () => {
  afterEach(() => {
    cleanup()
  })
  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(screen.getByText(/full name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(
      screen.getByText(/select a notification preference/i),
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/saved successfully/i),
    ).not.toBeInTheDocument()
  })

  it('shows field-specific errors for invalid input', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/full name/i), 'A')
    await user.type(screen.getByLabelText(/^email$/i), 'hello')
    await user.click(screen.getByLabelText(/email notifications/i))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(
      screen.getByText(/must be at least 2 characters/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument()
    expect(
      screen.queryByText(/select a notification preference/i),
    ).not.toBeInTheDocument()
  })

  it('shows a success message for valid submission', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/full name/i), 'Alishba Umer')
    await user.type(screen.getByLabelText(/^email$/i), 'alishba@example.com')
    await user.click(screen.getByLabelText(/email notifications/i))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(
      screen.getByText(/saved successfully/i),
    ).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('clears values, errors, and success message on reset', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/full name/i), 'Alishba Umer')
    await user.type(screen.getByLabelText(/^email$/i), 'alishba@example.com')
    await user.click(screen.getByLabelText(/email notifications/i))
    await user.click(screen.getByRole('button', { name: 'Save' }))
    await user.click(screen.getByRole('button', { name: 'Reset' }))

    expect(screen.getByLabelText(/full name/i)).toHaveValue('')
    expect(screen.getByLabelText(/^email$/i)).toHaveValue('')
    expect(screen.getByLabelText(/email notifications/i)).not.toBeChecked()
    expect(
      screen.queryByText(/saved successfully/i),
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
