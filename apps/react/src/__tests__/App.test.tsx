import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import App from '../App'

test('loads and displays greeting', () => {
  render(<App />)
  expect(screen.getByText('jscad ui')).toBeInTheDocument()
})
