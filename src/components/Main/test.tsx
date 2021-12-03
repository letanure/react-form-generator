import { render, screen } from '@testing-library/react'

import Main from '.'

describe('<Main />', () => {
  it.skip('should render the heading', () => {
    const { container } = render(<Main />)

    expect(
      screen.getByRole('heading', { name: /React Form Generator/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
