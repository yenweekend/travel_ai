import { startTransition, useActionState } from 'react'
import {
  DefaultValues,
  FieldValues,
  useForm,
  UseFormProps,
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { ActionResult } from '@/types/common'
import { useActionResultHandler } from '@/hooks/use-action-result-handlers'

export type ZodFormSchema = z.ZodObject<z.ZodRawShape>

export type FormInput<TSchema extends ZodFormSchema> = z.input<TSchema> &
  FieldValues

export type FormOutput<TSchema extends ZodFormSchema> = z.output<TSchema>

interface UseFormWithServerActionOptions<
  TSchema extends ZodFormSchema,
  TResult,
> {
  schema: TSchema

  action: (
    prev: ActionResult<TResult> | undefined,
    formData: FormData
  ) => Promise<ActionResult<TResult>>

  defaultValues?: DefaultValues<FormInput<TSchema>>

  onSuccess: (data?: TResult) => void
  onError?: (errors: Record<string, string>) => void
  formOptions?: Omit<
    UseFormProps<FormInput<TSchema>, unknown, FormOutput<TSchema>>,
    'resolver' | 'defaultValues'
  >
}

export const useFormWithServerAction = <
  TSchema extends ZodFormSchema,
  TResult,
>({
  schema,
  action,
  defaultValues,
  onSuccess,
  onError,
  formOptions = {},
}: UseFormWithServerActionOptions<TSchema, TResult>) => {
  type Input = FormInput<TSchema>
  type Output = FormOutput<TSchema>

  const form = useForm<Input, unknown, Output>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
    ...formOptions,
  })

  const [result, formAction, isPending] = useActionState(action, undefined)

  useActionResultHandler<Input, Output, TResult>({
    form,
    result,
    onSuccess,
    onError,
  })

  const handleSubmit = form.handleSubmit((data) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) return
      if (value === null) {
        formData.set(key, '__NULL__')

        return
      }
      if (value instanceof File) {
        formData.set(key, value)
      } else if (
        Array.isArray(value) &&
        value.length > 0 &&
        value.every((v) => v instanceof File)
      ) {
        value.forEach((file) => formData.append(key, file))
      } else if (typeof value === 'object') {
        formData.set(key, JSON.stringify(value))
      } else {
        formData.set(key, String(value))
      }
    })

    startTransition(() => {
      formAction(formData)
    })
  })

  return {
    form,
    handleSubmit,
    isPending,
    result,
    canSubmit: form.formState.isValid,
  }
}
