import { fireEvent, render, screen } from '@testing-library/react'

import Fieldset, { FieldsetProps } from '.'

const renderWithProps = (props: Partial<FieldsetProps> = {}) => {
  const spyOnChange = jest.fn<FieldData, []>()
  const spyOnSubmit = jest.fn<FieldData, []>()
  const config: FieldsetProps = {
    onChange: spyOnChange,
    onSubmit: spyOnSubmit,
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
  return {
    rendered: render(<Fieldset {...config} />),
    spyOnChange: spyOnChange,
    spyOnSubmit: spyOnSubmit
  }
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

  it('should render a button', () => {
    renderWithProps({
      hasSubmit: true,
      submitText: 'save'
    })
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  it('should get the data from Fields on change', () => {
    const spyOnChange = jest.fn<FieldData, []>()
    renderWithProps({
      onChange: spyOnChange
    })

    expect(spyOnChange).toBeCalledTimes(1)
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

  it('should call onChange', async () => {
    const { spyOnChange } = renderWithProps()

    expect(spyOnChange).toBeCalledTimes(1)
    expect(spyOnChange).toBeCalledWith(
      {
        test1: 'val1',
        test2: 'val2'
      },
      {
        changed: false,
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
        },
        touched: false,
        valid: true
      }
    )
    const input1 = screen.getByPlaceholderText(/p1/i)
    expect(input1).toBeInTheDocument()
    fireEvent.change(input1, { target: { value: 'bar' } })
    expect(spyOnChange).toBeCalledTimes(2)
    expect(spyOnChange).toBeCalledWith(
      {
        test1: 'bar',
        test2: 'val2'
      },
      {
        changed: true,
        touched: true,
        valid: true,
        fields: {
          test1: { changed: true, touched: true, valid: true, value: 'bar' },
          test2: { changed: false, touched: false, valid: true, value: 'val2' }
        }
      }
    )
    fireEvent.change(input1, { target: { value: 'val1' } })
    expect(spyOnChange).toBeCalledTimes(3)
    expect(spyOnChange).toBeCalledWith(
      {
        test1: 'val1',
        test2: 'val2'
      },
      {
        changed: false,
        touched: true,
        valid: true,
        fields: {
          test1: { changed: false, touched: true, valid: true, value: 'val1' },
          test2: { changed: false, touched: false, valid: true, value: 'val2' }
        }
      }
    )
  })

  it('should call onSumbit', async () => {
    const { spyOnSubmit } = renderWithProps({
      hasSubmit: true,
      submitText: 'send'
    })
    const button = screen.getByRole('button', { name: /send/i })
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(spyOnSubmit).toBeCalledTimes(1)
    expect(spyOnSubmit).toBeCalledWith(
      {
        test1: 'val1',
        test2: 'val2'
      },
      {
        changed: false,
        touched: false,
        valid: true,
        fields: {
          test1: { changed: false, touched: false, valid: true, value: 'val1' },
          test2: { changed: false, touched: false, valid: true, value: 'val2' }
        }
      }
    )
  })
})
