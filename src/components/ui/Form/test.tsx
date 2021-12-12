import { fireEvent, render, screen } from '@testing-library/react'

import Form, { FormProps } from '.'

const renderWithProps = (props: Partial<FormProps> = {}) => {
  const spyOnChange = jest.fn<FieldData, []>()
  const spyOnSubmit = jest.fn<FieldData, []>()
  const config: FormProps = {
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
    rendered: render(<Form {...config} />),
    spyOnChange: spyOnChange,
    spyOnSubmit: spyOnSubmit
  }
}

describe('<Form />', () => {
  describe('props', () => {
    it('should render a title', () => {
      renderWithProps({
        title: 'Test title'
      })
      expect(screen.getByText('Test title')).toBeInTheDocument()
    })

    it('should render a description', () => {
      renderWithProps({
        title: 'Test description'
      })
      expect(screen.getByText('Test description')).toBeInTheDocument()
    })
  })

  it('should render the config', () => {
    renderWithProps()

    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(2)

    const input1 = screen.getByPlaceholderText(/p1/i)
    expect(input1).toBeInTheDocument()
    const input2 = screen.getByPlaceholderText(/p2/i)
    expect(input2).toBeInTheDocument()
  })

  it('should get the data from Fields', () => {
    const { spyOnChange } = renderWithProps()

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

  it('should call onSubmit', async () => {
    const { spyOnSubmit } = renderWithProps()

    fireEvent.submit(screen.getByRole('form'))
    expect(spyOnSubmit).toBeCalledTimes(1)
    expect(spyOnSubmit).toBeCalledWith(
      {
        test1: 'val1',
        test2: 'val2'
      },
      {
        changed: false,
        fields: {
          test1: { changed: false, touched: false, valid: true, value: 'val1' },
          test2: { changed: false, touched: false, valid: true, value: 'val2' }
        },
        touched: false,
        valid: true
      }
    )
  })

  it('should call onChange', async () => {
    const { spyOnChange } = renderWithProps()

    fireEvent.submit(screen.getByRole('form'))
    expect(spyOnChange).toBeCalledTimes(2)
    expect(spyOnChange).toBeCalledWith(
      {
        test1: 'val1',
        test2: 'val2'
      },
      {
        changed: false,
        fields: {
          test1: { changed: false, touched: false, valid: true, value: 'val1' },
          test2: { changed: false, touched: false, valid: true, value: 'val2' }
        },
        touched: false,
        valid: true
      }
    )
  })

  it('should use the value prop over default in form config', async () => {
    const { spyOnChange } = renderWithProps({
      value: {
        test1: 'val3',
        test2: 'val4'
      }
    })

    fireEvent.submit(screen.getByRole('form'))
    expect(spyOnChange).toBeCalledTimes(2)
    expect(spyOnChange).toBeCalledWith(
      {
        test1: 'val3',
        test2: 'val4'
      },
      {
        changed: false,
        fields: {
          test1: { changed: false, touched: false, valid: true, value: 'val3' },
          test2: { changed: false, touched: false, valid: true, value: 'val4' }
        },
        touched: false,
        valid: true
      }
    )
  })
})
