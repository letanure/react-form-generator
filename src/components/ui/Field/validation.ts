import Validator, { ValidationSchema, ValidationError } from 'fastest-validator'

const validator = new Validator()

const runValidation = (
  ruleConfig: RuleConfig,
  value: unknown,
  label: string
): [boolean, string[]] => {
  const schema: ValidationSchema = {
    $$root: true,
    ...ruleConfig
  }
  const check = validator.compile(schema)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = check(value)
  if (result === true) return [true, []]
  const errors: string[] = result.map(
    (item: ValidationError) =>
      ruleConfig.message ||
      (item && item.message && item.message.replace("''", label))
  )
  return [false, errors]
}

export const runValidations = (
  validate: RuleConfig[],
  value: unknown,
  label: string
) =>
  validate
    .map((ruleConfig: ValidationSchema) =>
      runValidation(ruleConfig, value, label)
    )
    .reduce(
      (acc: [boolean, string[]], [isValid, errors]: [boolean, string[]]) => {
        return [
          (acc[0] || isValid) && acc[0] && isValid,
          [...acc[1], ...errors]
        ]
      },
      [true, []]
    )
