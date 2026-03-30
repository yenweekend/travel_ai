import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'

export type FieldType = 'text' | 'password' | 'email'

interface ControlledInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
  type?: FieldType
  disabled?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  inputClassName?: string
}

export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  disabled,
  prefix,
  suffix,
  inputClassName,
}: ControlledInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
          <div className="relative">
            {prefix}
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              aria-invalid={fieldState.invalid}
              className={inputClassName}
            />
            {suffix}
          </div>
          {fieldState.error && (
            <FieldError>{fieldState.error.message}</FieldError>
          )}
        </Field>
      )}
    />
  )
}
