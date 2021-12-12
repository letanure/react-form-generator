import { fireEvent, render, screen } from '@testing-library/react'

import Fieldset, { FieldsetProps } from '.'
import { FieldProps } from '../Field'

const renderWithProps = (props: Partial<FieldProps> = {}) => {
  const config: FieldsetProps = {
    onChange: jest.fn<FieldData, []>(),
    onSubmit: jest.fn<FieldData, []>(),
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
    ],
    ...props
  }
  return render(<Fieldset {...config} />)
}

describe('<Fieldset />', () => {
  it('should render the config', () => {
    renderWithProps()

    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(2)

    const input1 = screen.getByPlaceholderText(/p1/i)
    expect(input1).toBeInTheDocument()
    const input2 = screen.getByPlaceholderText(/p2/i)
    expect(input2).toBeInTheDocument()
  })

  it('should get the data from Fields on change', () => {
    const spyOnChange = jest.fn<FieldData, []>()
    renderWithProps({
      onChange: spyOnChange
    })

    expect(spyOnChange).toBeCalledTimes(2)
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

  it('should get the data from Fields on submit', () => {
    const spyOnSubmit = jest.fn<FieldData, []>()
    renderWithProps({
      onSubmit: spyOnSubmit,
      hasSubmit: true
    })

    expect(spyOnSubmit).toBeCalledTimes(0)
    const button = screen.getByRole('button', { name: /submit/i })
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(spyOnSubmit).toBeCalledTimes(1)
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
    expect(spyOnSubmit).toBeCalledWith(values, meta)
    const input = screen.getByRole('textbox', { name: /test1/i })
    fireEvent.change(input, { target: { value: 'bar' } })
    fireEvent.click(button)
    expect(spyOnSubmit).toBeCalledTimes(2)
    expect(spyOnSubmit).toBeCalledWith(
      {
        test1: 'bar',
        test2: 'val2'
      },
      {
        changed: true,
        touched: true,
        valid: true,
        fields: {
          test1: {
            changed: true,
            touched: true,
            valid: true,
            value: 'bar'
          },
          test2: {
            changed: false,
            touched: false,
            valid: true,
            value: 'val2'
          }
        }
      }
    )
  })
})
