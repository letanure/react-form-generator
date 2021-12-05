import { render, screen } from '@testing-library/react'

import FormAutomatic, { FormAutomaticProps } from '.'

describe('<FormAutomatic />', () => {
  it('should render a form with an simple object', () => {
    const props: FormAutomaticProps = {
      value: {
        name: 'some name',
        email: 'some@email.com',
        someData: 'some data'
      },
      onChange: jest.fn<FieldData, []>(),
      onSubmit: jest.fn<FieldData, []>()
    }
    render(<FormAutomatic {...props} />)

    const inputName = screen.getByRole('textbox', { name: /name/i })
    expect(inputName).toBeInTheDocument()
    const inputEmail = screen.getByRole('textbox', { name: /email/i })
    expect(inputEmail).toBeInTheDocument()
    const inputData = screen.getByRole('textbox', { name: /some data/i })
    expect(inputData).toBeInTheDocument()
    const button = screen.getByRole('button', { name: /submit/i })
    expect(button).toBeInTheDocument()
  })
})
