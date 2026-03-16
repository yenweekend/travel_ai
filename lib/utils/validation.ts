export const ValidationMessages = {
  require: (field: string) => `Please enter ${field}`,
  maxLength: (field: string, maxLength: number) =>
    `${field} must not exceed ${maxLength} characters`,
  minLength: (field: string, minLength: number) =>
    `${field} must be at least ${minLength} characters`,
  numberMinLength: (field: string, minLength: number) =>
    `${field} must be greater than or equal to ${minLength}`,
  numberMaxLength: (field: string, maxLength: number) =>
    `${field} must be less than or equal to ${maxLength}`,
  email: 'Please enter a valid email address.',
}
