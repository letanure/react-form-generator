import { fireEvent, render, screen } from '@testing-library/react'

import Field, { FieldProps } from '.'

describe('<Field />', () => {
  it('should render a input with basic config ', () => {
    const spyOnChange = jest.fn<FieldData, []>()

    const config: FieldProps = {
      name: 'test',
      label: 'Test',
      type: 'text',
      value: 'val',
      onChange: spyOnChange
    }
    render(<Field {...config} />)

    expect(
      screen.getByRole('textbox', {
        name: /Test/i
      })
    ).toBeInTheDocument()
  })

  it('should render a input type text by default ', () => {
    const spyOnChange = jest.fn<FieldData, []>()

    const config: FieldProps = {
      name: 'test',
      label: 'Test',
      value: 'val',
      onChange: spyOnChange
    }
    render(<Field {...config} />)

    expect(
      screen.getByRole('textbox', {
        name: /Test/i
      })
    ).toHaveAttribute('type', 'text')
  })

  it('should call on change with data on load', () => {
    const spyOnChange = jest.fn<FieldData, []>()

    const config: FieldProps = {
      name: 'test',
      label: 'Test',
      value: 'val',
      onChange: spyOnChange
    }
    render(<Field {...config} />)

    expect(spyOnChange).toBeCalledTimes(1)
    expect(spyOnChange).toBeCalledWith({
      changed: false,
      touched: false,
      valid: false,
      value: 'val'
    })
  })

  it('should call on change with data on load', () => {
    const spyOnChange = jest.fn<FieldData, []>()

    const config: FieldProps = {
      name: 'test',
      label: 'Test',
      value: 'val',
      placeholder: 'foo',
      onChange: spyOnChange
    }
    render(<Field {...config} />)

    const input = screen.getByPlaceholderText(/foo/i)

    expect(spyOnChange).toBeCalledTimes(1)
    fireEvent.change(input, { target: { value: 'bar' } })
    expect(spyOnChange).toBeCalledTimes(2)

    expect(spyOnChange).toBeCalledWith({
      changed: true,
      touched: true,
      valid: false,
      value: 'bar'
    })
  })

  it('should keep changed false if is the same original values', () => {
    const spyOnChange = jest.fn<FieldData, []>()

    const config: FieldProps = {
      name: 'test',
      label: 'Test',
      value: 'foo',
      placeholder: 'demo',
      onChange: spyOnChange
    }
    render(<Field {...config} />)

    expect(spyOnChange).toBeCalledTimes(1)
    expect(spyOnChange).toBeCalledWith({
      changed: false,
      touched: false,
      valid: false,
      value: 'foo'
    })

    const input = screen.getByPlaceholderText(/demo/i)

    fireEvent.change(input, { target: { value: 'bar' } })
    expect(spyOnChange).toBeCalledTimes(2)
    expect(spyOnChange).toBeCalledWith({
      changed: true,
      touched: true,
      valid: false,
      value: 'bar'
    })
    fireEvent.change(input, { target: { value: 'foo' } })
    expect(spyOnChange).toBeCalledTimes(3)
    expect(spyOnChange).toBeCalledWith({
      changed: false,
      touched: true,
      valid: false,
      value: 'foo'
    })
  })

  const inputTypes: FieldTypes[] = [
    'color',
    'datetime-local',
    'datetime',
    'email',
    'hidden',
    'month',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'time',
    'url'
  ]
  inputTypes.map((inputType: FieldTypes) => {
    it(`should render  input type: ${inputType}`, () => {
      const spyOnChange = jest.fn<FieldData, []>()

      const config: FieldProps = {
        name: 'test',
        label: 'Test',
        type: inputType,
        value: 'foo',
        placeholder: 'demo',
        onChange: spyOnChange
      }
      render(<Field {...config} />)
      const input = screen.getByPlaceholderText(/demo/i)
      expect(input).toHaveAttribute('type', inputType)
    })
  })
})
