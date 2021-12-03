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


