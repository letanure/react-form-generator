import { render, screen } from '@testing-library/react'

import Fieldset, { FieldsetProps } from '.'

const spyOnChange = jest.fn<FieldData, []>()
const configFieldset: FieldsetProps = {
  onChange: spyOnChange,
  fields: [
    {
      name: 'test1',
      label: 'Test1',
      type: 'text',
      value: 'val1',
      placeholder: 'p1'
    },
    {
      name: 'test2',
      label: 'Test2',
      type: 'text',
      value: 'val2',
      placeholder: 'p2'
    }
  ]
}

describe('<Fieldset />', () => {
  it('should render the config', () => {
    render(<Fieldset {...configFieldset} />)

    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(2)

    const input1 = screen.getByPlaceholderText(/p1/i)
    expect(input1).toBeInTheDocument()
    const input2 = screen.getByPlaceholderText(/p2/i)
    expect(input2).toBeInTheDocument()
  })

  it('should get the data from Fields', () => {
    render(<Fieldset {...configFieldset} />)

    expect(spyOnChange).toBeCalledTimes(4)
    const values = {
      test1: 'val1',
      test2: 'val2'
    }
    const meta = {
      changed: false,
      touched: false,
      valid: true,
      fields: {
        test1: {
          changed: false,
          touched: false,
          valid: true,
          value: 'val1'
        },
        test2: {
          changed: false,
          touched: false,
          valid: true,
          value: 'val2'
        }
      }
    }
    expect(spyOnChange).toBeCalledWith(values, meta)
  })
})
