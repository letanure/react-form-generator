module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?'
      },
      {
        type: 'rawlist',
        name: 'folder',
        message: 'What kind of component?',
        choices: [
          {
            key: 'r',
            name: 'Normal',
            value: 'components'
          },
          {
            key: 'u',
            name: 'UI',
            value: 'components/ui'
          }
        ]
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../src/{{folder}}/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/Component.tsx.hbs'
      },
      {
        type: 'add',
        path: '../src/{{folder}}/{{pascalCase name}}/styles.ts',
        templateFile: 'templates/styles.ts.hbs'
      },
      {
        type: 'add',
        path: '../src/{{folder}}/{{pascalCase name}}/stories.tsx',
        templateFile: 'templates/stories.tsx.hbs'
      },
      {
        type: 'add',
        path: '../src/{{folder}}/{{pascalCase name}}/test.tsx',
        templateFile: 'templates/test.tsx.hbs'
      }
    ]
  })
}
