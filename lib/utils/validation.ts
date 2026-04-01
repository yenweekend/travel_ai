export const ValidationMessages = {
  require: (field: string) => `Vui lòng nhập ${field}`,
  maxLength: (field: string, maxLength: number) =>
    `${field} không được vượt quá ${maxLength} ký tự`,
  minLength: (field: string, minLength: number) =>
    `${field} phải có ít nhất ${minLength} ký tự`,
  numberMinLength: (field: string, minLength: number) =>
    `${field} phải lớn hơn hoặc bằng ${minLength}`,
  numberMaxLength: (field: string, maxLength: number) =>
    `${field} phải nhỏ hơn hoặc bằng ${maxLength}`,
  email: 'Vui lòng nhập địa chỉ email hợp lệ.',
  phone: 'Số điện thoại không hợp lệ',
}
