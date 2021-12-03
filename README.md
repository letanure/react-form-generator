# React form generator


[live version](https://react-form-generator.vercel.app/)
check the components on [Storybook](https://61aa03e5bd6766003a35aefa-guefmzqesw.chromatic.com/?path=/story/demo-main--basic)


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
  label: string
  name: string
  type?: FieldTypes
  value: FieldData['value']
  placeholder?: string
  validate?: ValidationSchema[]
  // textarea
  rows?: number
}
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

