[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/letanure/react-form-generator/ci)](https://github.com/letanure/react-form-generator/actions/workflows/ci.yml)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/letanure/react-form-generator)](https://codeclimate.com/github/letanure/react-form-generator/maintainability)
[![Codecov](https://img.shields.io/codecov/c/github/letanure/react-form-generator)](https://codecov.io/gh/letanure/react-form-generator)

# React form generator


Check the [live version](https://react-form-generator.vercel.app/)
Test all tem components  on [Storybook](https://main--61aa03e5bd6766003a35aefa.chromatic.com/)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### TLDR

```ts
const formConfig: FormConfig = {
  title: 'He',
  fields: [
    {
      label: 'Name',
      name: 'name',
      value: ''
    },
    {
      label: 'Description',
      name: 'field1',
      type: 'text'
      value: 'test'
    },
    {
      label: 'Age',
      name: 'age',
      type: 'number'
      value: ''
    }
  ]
}

<Form
    {...formConfig}
    onChange={handleOnChange}
    onSubmit={handleSubmit}
  />`
```

#### Form config

The form config has text (title, description, button) and a array of field configs

```ts
type FormConfig = {
  fields: FieldConfig[]
  title?: string
  submitText?: string
  description?: string
}
```

#### Field config

The field config should use the default  HTML `<input />` and `<textarea />` props


```ts
type FieldConfig = {
  name: string
  value: FieldData['value']
  label?: string
  type?: FieldTypes
  placeholder?: string
  validate?: ValidationSchema[]
  disabled: boolean
  readonly: boolean
  // textarea
  rows?: number
  // select
  options?: FieldOption[]
  maxErrors?: number
}

type FieldOption = {
  value: FieldData['value']
  label: string
}
```

#### Field types

by default, the type is `text`, but you can choose one of the following options

```
| 'color'
| 'datetime-local'
| 'datetime'
| 'date'
| 'email'
| 'hidden'
| 'month'
| 'number'
| 'password'
| 'search'
| 'tel'
| 'text'
| 'time'
| 'url'
| 'textarea'
| 'select'
| 'radioGroup'
```

#### Validation methods

The validation uses [fastest-validator](https://github.com/icebob/fastest-validator) as root element schema.

to add validation to a field, add:

```ts
{
  label: 'Age',
  name: 'age',
  type: 'number'
  value: '',
  validation: [
    { type: 'number',  min: 18, max: 69 }
  ]
}
```


##### ValidationSchema

The available built in methods:

```js

// No validation
{ type: 'any' }

// URL
{ type: 'url' }

// email
{ type: 'email' }

// date, convert from string with convert
{ type: 'date', convert?: true },

// enum
{ type: 'enum', values: ['AA', 'BBB'] }

// equal, strict with type check
{ type: 'equal', value: 'CCC', strict?: true }

// number
{ type: 'number',
    min?: 5
    max?: 10
    equal?: 'DD'
    notEqual?: 'EE'
    integer?: true
    positive?: true
    negative?: true
    convert?: true
}

// Strings
{ type: 'string',
  empty?: false,
  min?: true,
  max?: true,
  length?: true,
  pattern?: /^foo/,
  contains?: 'bar',
  enum?: ['foo', 'bar'],
  alpha?: true,
  numeric?: true,
  alphanum?: true,
  alphadash?: true,
  hex?: true,
  singleLine?: true,
  base64?: true
}
```

