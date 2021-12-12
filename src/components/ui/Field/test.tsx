import { fireEvent, render, screen } from '@testing-library/react'

import Field, { FieldProps } from '.'

const renderWithProps = (props: Partial<FieldProps> = {}) => {
  const config: FieldProps = {
    name: 'test',
    value: 'val',
    onChange: jest.fn<FieldData, []>(),
    ...props
  }
  return render(<Field {...config} />)
}

describe('<Field />', () => {
  describe('basic', () => {
    it('should render a input text with minimum config ', () => {
      renderWithProps()
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('name', 'test')
      expect(input).toHaveAttribute('type', 'text')
      expect(input).toHaveValue('val')
    })
  })

  describe('props', () => {
    it('should render name attribute ', () => {
      renderWithProps()
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'test')
    })

    it('should render value attribute ', () => {
      renderWithProps()
      expect(screen.getByRole('textbox')).toHaveAttribute('value', 'val')
    })

    it('should render label if provided ', () => {
      renderWithProps({ label: 'myLabel' })
      expect(screen.getByText(/mylabel/i)).toBeInTheDocument()
    })

    it('should NOT render label tag if not provided ', () => {
      const { container } = renderWithProps()
      expect(container.querySelector('.label')).toBeNull()
    })

    it('should render a input type text by default ', () => {
      renderWithProps()
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    })

    it('should have attibute placeholder if prop provided', () => {
      renderWithProps({ placeholder: 'myPlaceholder' })
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'placeholder',
        'myPlaceholder'
      )
    })

    it('should NOT have attribute placeholder if prop NOT provided', () => {
      renderWithProps()
      expect(screen.getByRole('textbox')).not.toHaveAttribute('placeholder')
    })

    it('should have attribute readonly if prop provided', () => {
      renderWithProps({ readonly: true })
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
    })

    it('should NOT have attribute readonly if prop NOT provided', () => {
      renderWithProps()
      expect(screen.getByRole('textbox')).not.toHaveAttribute('readonly')
    })

    it('should have attibute disabled if prop provided', () => {
      renderWithProps({ disabled: true })
      expect(screen.getByRole('textbox')).toHaveAttribute('disabled')
    })

    it('should NOT have attribute disabled if prop NOT provided', () => {
      renderWithProps()
      expect(screen.getByRole('textbox')).not.toHaveAttribute('disabled')
    })
  })

  describe('events', () => {
    it('should call on change with data on load', () => {
      const spyOnChange = jest.fn<FieldData, []>()
      renderWithProps({
        onChange: spyOnChange
      })

      expect(spyOnChange).toBeCalledTimes(2)
      expect(spyOnChange).toBeCalledWith({
        changed: false,
        touched: false,
        valid: true,
        value: 'val'
      })
    })

    it('should call on change with data on load', () => {
      const spyOnChange = jest.fn<FieldData, []>()
      renderWithProps({
        onChange: spyOnChange
      })
      const input = screen.getByRole('textbox')
      expect(spyOnChange).toBeCalledTimes(2)
      fireEvent.change(input, { target: { value: 'bar' } })
      expect(spyOnChange).toBeCalledTimes(3)
      expect(spyOnChange).toBeCalledWith({
        changed: true,
        touched: true,
        valid: true,
        value: 'bar'
      })
    })

    it('should call on change with data on load with object type', () => {
      const spyOnChange = jest.fn<FieldData, []>()
      renderWithProps({
        onChange: spyOnChange,
        name: 'test',
        value: {},
        type: 'object',
        fields: [
          {
            name: 'test2',
            label: 'inside',
            value: '',
            type: 'text'
          }
        ]
      })

      expect(spyOnChange).toBeCalledTimes(4)
      expect(spyOnChange).toBeCalledWith({
        changed: false,
        touched: false,
        valid: false,
        value: {
          test2: ''
        }
      })
      const input = screen.getByLabelText(/inside/i)
      fireEvent.change(input, { target: { value: 'bar' } })
    })

    it('should keep changed false if is the same original values', () => {
      const spyOnChange = jest.fn<FieldData, []>()
      renderWithProps({
        onChange: spyOnChange
      })

      expect(spyOnChange).toBeCalledTimes(2)
      expect(spyOnChange).toBeCalledWith({
        changed: false,
        touched: false,
        valid: true,
        value: 'val'
      })
      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'bar' } })
      expect(spyOnChange).toBeCalledTimes(3)
      expect(spyOnChange).toBeCalledWith({
        changed: true,
        touched: true,
        valid: true,
        value: 'bar'
      })
      fireEvent.change(input, { target: { value: 'val' } })
      expect(spyOnChange).toBeCalledTimes(4)
      expect(spyOnChange).toBeCalledWith({
        changed: false,
        touched: true,
        valid: true,
        value: 'val'
      })
    })
  })

  describe('Field types', () => {
    it('should render a url field', () => {
      renderWithProps({
        type: 'url'
      })
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url')
    })

    it('should render a time field', () => {
      renderWithProps({
        type: 'time',
        label: 'field-time'
      })
      expect(screen.getByLabelText('field-time')).toHaveAttribute(
        'type',
        'time'
      )
    })

    it('should render a tel field', () => {
      renderWithProps({
        type: 'tel'
      })
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel')
    })

    it('should render a search field', () => {
      renderWithProps({
        type: 'search'
      })
      expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search')
    })

    it('should render a password field', () => {
      renderWithProps({
        type: 'password',
        label: 'field-password'
      })
      expect(screen.getByLabelText('field-password')).toHaveAttribute(
        'type',
        'password'
      )
    })

    it('should render a number field', () => {
      renderWithProps({
        type: 'number'
      })
      expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number')
    })

    it('should render a month field', () => {
      renderWithProps({
        type: 'month',
        label: 'field-month'
      })
      expect(screen.getByLabelText('field-month')).toHaveAttribute(
        'type',
        'month'
      )
    })

    it('should render a hidden field', () => {
      const { container } = renderWithProps({
        type: 'hidden'
      })

      expect(container.querySelector('[type="hidden"]')).toHaveValue('val')
    })

    it('should render a email field', () => {
      renderWithProps({
        type: 'email'
      })
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
    })

    it('should render a datetime field', () => {
      renderWithProps({
        type: 'datetime',
        label: 'field-datetime'
      })
      expect(screen.getByLabelText('field-datetime')).toHaveAttribute(
        'type',
        'datetime'
      )
    })

    it('should render a datetime-local field', () => {
      renderWithProps({
        type: 'datetime-local',
        label: 'field-datetime-local'
      })
      expect(screen.getByLabelText('field-datetime-local')).toHaveAttribute(
        'type',
        'datetime-local'
      )
    })

    it('should render a color field', () => {
      renderWithProps({
        type: 'color',
        label: 'field-label'
      })
      expect(screen.getByLabelText('field-label')).toHaveAttribute(
        'type',
        'color'
      )
    })

    it('should render a text field', () => {
      renderWithProps({
        type: 'text'
      })
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    })

    it('should render a text field by default', () => {
      renderWithProps()
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    })

    it('should render a select field', () => {
      renderWithProps({
        type: 'select',
        options: [
          {
            label: 'foo',
            value: '1'
          },
          {
            label: 'bar',
            value: '2'
          }
        ]
      })
      const option1 = screen.getByRole('option', { name: /foo/i })
      const option2 = screen.getByRole('option', { name: /bar/i })
      expect(screen.getByRole('combobox')).toBeInTheDocument()
      expect(option1).toBeInTheDocument()
      expect(option1).toHaveTextContent('foo')
      expect(option1).toHaveValue('1')
      expect(option2).toBeInTheDocument()
      expect(option2).toHaveTextContent('bar')
      expect(option2).toHaveValue('2')
    })

    it('should render a select field with placeholder', () => {
      renderWithProps({
        type: 'select',
        placeholder: 'select one',
        options: [
          {
            label: 'foo',
            value: '1'
          },
          {
            label: 'bar',
            value: '2'
          }
        ]
      })
      const optionPlaceholder = screen.getByRole('option', {
        name: /select one/i
      })
      expect(optionPlaceholder).toBeInTheDocument()
      expect(optionPlaceholder).toHaveTextContent('select one')
      expect(optionPlaceholder).toHaveValue('')
    })

    it('should render a sub form for type object ', () => {
      renderWithProps({
        type: 'object',
        value: {},
        fields: [
          {
            label: 'foo',
            name: 'foo',
            type: 'text',
            value: ''
          },
          {
            label: 'bar',
            name: 'bar',
            type: 'text',
            value: ''
          }
        ]
      })
      expect(screen.getByLabelText('foo')).toBeInTheDocument()
      expect(screen.getByLabelText('bar')).toBeInTheDocument()
    })

    it('should render a select field', () => {
      renderWithProps({
        type: 'radioGroup',
        name: 'radioGroup',
        label: 'radioGroup!!!',
        options: [
          {
            label: 'foo',
            value: '1'
          },
          {
            label: 'bar',
            value: '2'
          }
        ]
      })
      const inputsRadio = screen.getAllByRole('radio')
      expect(inputsRadio).toHaveLength(2)
      expect(inputsRadio[0]).toHaveProperty('name', 'radioGroup')
      expect(inputsRadio[0]).toHaveProperty('value', '1')
      expect(inputsRadio[1]).toHaveProperty('name', 'radioGroup')
      expect(inputsRadio[1]).toHaveProperty('value', '2')
    })

    it('should render subform for type array', () => {
      renderWithProps({
        type: 'array',
        value: [],
        fields: [
          {
            label: 'foo',
            name: 'foo',
            type: 'text',
            value: ''
          },
          {
            label: 'bar',
            name: 'bar',
            type: 'text',
            value: ''
          }
        ]
      })
      expect(screen.getByLabelText('foo')).toBeInTheDocument()
      expect(screen.getByLabelText('bar')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
    })

    it('should render subform for type array', () => {
      const { container } = renderWithProps({
        type: 'array',
        value: [{ foo: '11', bar: '22' }],
        fields: [
          {
            label: 'foo',
            name: 'foo',
            type: 'text',
            value: '111'
          },
          {
            label: 'bar',
            name: 'bar',
            type: 'text',
            value: '222'
          }
        ]
      })
      const input1 = container.querySelectorAll('.fieldset input')[0]
      expect(input1).toBeInTheDocument()
      expect(input1).toHaveValue('11')
      const input2 = container.querySelectorAll('.fieldset input')[1]
      expect(input2).toBeInTheDocument()
      expect(input2).toHaveValue('22')
      const input3 = container.querySelectorAll('.fieldset input')[2]
      expect(input3).toBeInTheDocument()
      expect(input3).toHaveValue('111')
      const input4 = container.querySelectorAll('.fieldset input')[3]
      expect(input4).toBeInTheDocument()
      expect(input4).toHaveValue('222')
    })

    it('should render remove a item on click delete', () => {
      const { container } = renderWithProps({
        type: 'array',
        value: [
          { foo: '1a', bar: '1b' },
          { foo: '2a', bar: '2b' }
        ],
        fields: [
          {
            label: 'foo',
            name: 'foo',
            type: 'text',
            value: 'a'
          },
          {
            label: 'bar',
            name: 'bar',
            type: 'text',
            value: 'b'
          }
        ]
      })
      expect(container.querySelectorAll('button')).toHaveLength(3)
      fireEvent.click(container.querySelectorAll('button')[0])
      expect(container.querySelectorAll('button')).toHaveLength(2)
      fireEvent.click(container.querySelectorAll('button')[0])
      expect(container.querySelectorAll('button')).toHaveLength(1)
      fireEvent.click(container.querySelectorAll('button')[0])
      expect(container.querySelectorAll('button')).toHaveLength(2)
    })
  })

  describe('validation', () => {
    it('should be valid on load if no validation provided ', () => {
      const spyOnChange = jest.fn<FieldData, []>()
      renderWithProps({
        onChange: spyOnChange
      })
      expect(spyOnChange).toBeCalledTimes(2)
      expect(spyOnChange).toBeCalledWith({
        changed: false,
        touched: false,
        valid: true,
        value: 'val'
      })
    })

    it('should be valid on load if validation & valid value provided ', () => {
      const spyOnChange = jest.fn<FieldData, []>()
      renderWithProps({
        onChange: spyOnChange
      })
      expect(spyOnChange).toBeCalledTimes(2)
      expect(spyOnChange).toBeCalledWith({
        changed: false,
        touched: false,
        valid: true,
        value: 'val'
      })
    })

    it('should be INVALID on load if validation & invalid value provided ', () => {
      const spyOnChange = jest.fn<FieldData, []>()
      renderWithProps({
        onChange: spyOnChange,
        validate: [{ type: 'string', min: 5 }]
      })
      expect(spyOnChange).toBeCalledTimes(2)
      expect(spyOnChange).toBeCalledWith({
        changed: false,
        touched: false,
        valid: false,
        value: 'val'
      })
    })
  })
})
