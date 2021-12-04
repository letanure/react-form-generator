import { fireEvent, render, screen } from '@testing-library/react'
import { FieldData, FieldTypes } from 'types'

import Field, { FieldProps } from '.'

describe('<Field />', () => {
  describe('basic', () => {
    it('should render a input text with minimum config ', () => {
      const config: FieldProps = {
        name: 'test',
        value: 'val',
        onChange: jest.fn<FieldData, []>()
      }
      render(<Field {...config} />)
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('name', 'test')
      expect(input).toHaveAttribute('type', 'text')
      expect(input).toHaveValue('val')
    })
  })

  describe('props', () => {
    it('should render name attribute ', () => {
      const config: FieldProps = {
        name: 'test',
        value: 'val',
        onChange: jest.fn<FieldData, []>()
      }
      render(<Field {...config} />)
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'test')
    })

    it('should render value attribute ', () => {
      const config: FieldProps = {
        name: 'test',
        value: 'val',
        onChange: jest.fn<FieldData, []>()
      }
      render(<Field {...config} />)
      expect(screen.getByRole('textbox')).toHaveAttribute('value', 'val')
    })

    it('should render label if provided ', () => {
      const config: FieldProps = {
        name: 'test',
        value: 'val',
        label: 'myLabel',
        onChange: jest.fn<FieldData, []>()
      }
      render(<Field {...config} />)
      expect(screen.getByText(/mylabel/i)).toBeInTheDocument()
    })

    it('should NOT render label tag if not provided ', () => {
      const config: FieldProps = {
        name: 'test',
        value: 'val',
        onChange: jest.fn<FieldData, []>()
      }
      const { container } = render(<Field {...config} />)
      expect(container.querySelector('.label')).toBeNull()
    })

    it('should render a input type text by default ', () => {
      const config: FieldProps = {
        name: 'test',
        value: 'val',
        onChange: jest.fn<FieldData, []>()
      }
      render(<Field {...config} />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    })

    it('should have attibute placeholder if prop provided', () => {
      const config: FieldProps = {
        name: 'test',
        value: 'val',
        placeholder: 'myPlaceholder',
        onChange: jest.fn<FieldData, []>()
      }
      render(<Field {...config} />)
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'placeholder',
        'myPlaceholder'
      )
    })

    it('should NOT have attribute placeholder if prop NOT provided', () => {
      const config: FieldProps = {
        name: 'test',
        value: 'val',
        onChange: jest.fn<FieldData, []>()
      }
      render(<Field {...config} />)
      expect(screen.getByRole('textbox')).not.toHaveAttribute('placeholder')
    })

    it('should have attribute readonly if prop provided', () => {
      const config: FieldProps = {
        name: 'test',
        value: 'val',
        readonly: true,
        onChange: jest.fn<FieldData, []>()
      }
      render(<Field {...config} />)
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
    })

    it('should NOT have attribute readonly if prop NOT provided', () => {
      const config: FieldProps = {
        name: 'test',
        value: 'val',
        onChange: jest.fn<FieldData, []>()
      }
      render(<Field {...config} />)
      expect(screen.getByRole('textbox')).not.toHaveAttribute('readonly')
    })

    it('should have attibute disabled if prop provided', () => {
      const config: FieldProps = {
        name: 'test',
        value: 'val',
        disabled: true,
        onChange: jest.fn<FieldData, []>()
      }
      render(<Field {...config} />)
      expect(screen.getByRole('textbox')).toHaveAttribute('disabled')
    })

    it('should NOT have attribute disabled if prop NOT provided', () => {
      const config: FieldProps = {
        name: 'test',
        value: 'val',
        onChange: jest.fn<FieldData, []>()
      }
      render(<Field {...config} />)
      expect(screen.getByRole('textbox')).not.toHaveAttribute('disabled')
    })
  })

  describe('events', () => {
    it('should call on change with data on load', () => {
      const spyOnChange = jest.fn<FieldData, []>()

      const config: FieldProps = {
        name: 'test',
        value: 'val',
        onChange: spyOnChange
      }
      render(<Field {...config} />)

      expect(spyOnChange).toBeCalledTimes(1)
      expect(spyOnChange).toBeCalledWith({
        changed: false,
        touched: false,
        valid: true,
        value: 'val'
      })
    })

    it.skip('should call on change with data on load', () => {
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
        valid: true,
        value: 'bar'
      })
    })

    it.skip('should keep changed false if is the same original values', () => {
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
        valid: true,
        value: 'foo'
      })

      const input = screen.getByPlaceholderText(/demo/i)

      fireEvent.change(input, { target: { value: 'bar' } })
      expect(spyOnChange).toBeCalledTimes(2)
      expect(spyOnChange).toBeCalledWith({
        changed: true,
        touched: true,
        valid: true,
        value: 'bar'
      })
      fireEvent.change(input, { target: { value: 'foo' } })
      expect(spyOnChange).toBeCalledTimes(3)
      expect(spyOnChange).toBeCalledWith({
        changed: false,
        touched: true,
        valid: true,
        value: 'foo'
      })
    })
  })

  // describe('validation', () => {})

  describe('Field types', () => {
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
      it.skip(`should render  input type: ${inputType}`, () => {
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
})
