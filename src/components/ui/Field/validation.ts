import Validator, { ValidationSchema, ValidationError } from 'fastest-validator'

const validator = new Validator()

const runValidation = (
  ruleConfig: RuleConfig,
  value: unknown,
  label: string
): string[] => {
  const check = validator.compile({
    $$root: true,
    ...ruleConfig
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = check(value)
  return (
    (result === true && []) ||
    result.map(
      ({ message }: ValidationError) =>
        ruleConfig.message || (message && message.replace("''", label))
    )
  )
}

export const runValidations = (
  validate: RuleConfig[],
  value: unknown,
  label: string | undefined = ''
): string[] =>
  validate
    .map((ruleConfig: ValidationSchema) =>
      runValidation(ruleConfig, value, label)
    )
    .flat()
