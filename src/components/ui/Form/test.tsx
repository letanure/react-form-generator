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

    it('should render a title', () => {
      renderWithProps({
        title: 'Test title'
      })
      expect(screen.getByText('Test title')).toBeInTheDocument()
    })

    it('should render a description', () => {
      renderWithProps({
        description: 'Test description'
      })
      expect(screen.getByText('Test description')).toBeInTheDocument()
    })

    it('should change the submit button text', () => {
      renderWithProps({
        submitText: 'Save'
      })
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
    })

    it('should render layout vertical by default ', () => {
      const { rendered } = renderWithProps()
      expect(
        rendered.container.querySelector('label:nth-child(1)')
      ).toHaveClass('layout-vertical')
    })

    it('should render layout horizontal ', () => {
      const { rendered } = renderWithProps({ layout: 'horizontal' })
      expect(
        rendered.container.querySelector('label:nth-child(1)')
      ).toHaveClass('layout-horizontal')
    })

    it('should render layout horizontal bordered ', () => {
      const { rendered } = renderWithProps({ layout: 'horizontal-bordered' })
      expect(
        rendered.container.querySelector('label:nth-child(1)')
      ).toHaveClass('layout-horizontal-bordered')
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
    expect(spyOnChange).toBeCalledTimes(1)
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
    expect(spyOnChange).toBeCalledTimes(1)
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

  it('complete form render, onchange, submit', async () => {
    const { spyOnChange, spyOnSubmit } = renderWithProps({
      value: {
        test1: 'val3',
        test2: 'val4'
      }
    })

    const label1 = screen.getByText(/test1/i)
    expect(label1).toBeInTheDocument()
    const input1 = screen.getByPlaceholderText(/p1/i)
    expect(input1).toBeInTheDocument()
    const label2 = screen.getByText(/test2/i)
    expect(label2).toBeInTheDocument()
    const input2 = screen.getByPlaceholderText(/p2/i)
    expect(input2).toBeInTheDocument()
    const button = screen.getByRole('button', { name: /submit/i })
    expect(button).toBeInTheDocument()
    expect(spyOnChange).toBeCalledTimes(1)
    expect(spyOnChange).toBeCalledWith(
      {
        test1: 'val3',
        test2: 'val4'
      },
      {
        changed: false,
        touched: false,
        valid: true,
        fields: {
          test1: { changed: false, touched: false, valid: true, value: 'val3' },
          test2: { changed: false, touched: false, valid: true, value: 'val4' }
        }
      }
    )
    fireEvent.change(input1, { target: { value: 'bar' } })
    expect(spyOnChange).toBeCalledTimes(2)
    expect(spyOnChange).toBeCalledWith(
      {
        test1: 'bar',
        test2: 'val4'
      },
      {
        changed: true,
        touched: true,
        valid: true,
        fields: {
          test1: { changed: true, touched: true, valid: true, value: 'bar' },
          test2: { changed: false, touched: false, valid: true, value: 'val4' }
        }
      }
    )
    fireEvent.change(input1, { target: { value: 'val3' } })
    expect(spyOnChange).toBeCalledTimes(3)
    expect(spyOnChange).toBeCalledWith(
      {
        test1: 'val3',
        test2: 'val4'
      },
      {
        changed: false,
        touched: true,
        valid: true,
        fields: {
          test1: { changed: false, touched: true, valid: true, value: 'val3' },
          test2: { changed: false, touched: false, valid: true, value: 'val4' }
        }
      }
    )
    fireEvent.click(button)
    expect(spyOnSubmit).toBeCalledTimes(1)
    expect(spyOnSubmit).toBeCalledWith(
      {
        test1: 'val3',
        test2: 'val4'
      },
      {
        changed: false,
        touched: true,
        valid: true,
        fields: {
          test1: { changed: false, touched: true, valid: true, value: 'val3' },
          test2: { changed: false, touched: false, valid: true, value: 'val4' }
        }
      }
    )
    fireEvent.change(input2, { target: { value: 'val5' } })
    fireEvent.submit(screen.getByRole('form'))
    expect(spyOnSubmit).toBeCalledTimes(2)
    expect(spyOnSubmit).toBeCalledWith(
      {
        test1: 'val3',
        test2: 'val5'
      },
      {
        changed: true,
        touched: true,
        valid: true,
        fields: {
          test1: { changed: false, touched: true, valid: true, value: 'val3' },
          test2: { changed: true, touched: true, valid: true, value: 'val5' }
        }
      }
    )
  })
})
