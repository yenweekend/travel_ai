import { useEffect, useRef } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { ActionResult } from '@/types/common'

interface UseActionResultHandlerProps<
  TInput extends FieldValues,
  TOutput extends FieldValues,
  TResult,
> {
  result?: ActionResult<TResult>
  form: UseFormReturn<TInput, unknown, TOutput>
  onSuccess?: (data?: TResult) => void
  onError?: (errors: Record<string, string>) => void
}

export const useActionResultHandler = <
  TInput extends FieldValues,
  TOutput extends FieldValues,
  TResult,
>({
  result,
  form,
  onSuccess,
  onError,
}: UseActionResultHandlerProps<TInput, TOutput, TResult>) => {
  const processedResult = useRef<ActionResult<TResult> | null>(null)

  useEffect(() => {
    if (!result || result === processedResult.current) return

    processedResult.current = result

    form.clearErrors()

    if (result.success) {
      onSuccess?.(result.data)
    } else {
      onError?.(result.errors)

      Object.entries(result.errors).forEach(([field, message]) => {
        form.setError(field as Path<TInput>, { message })
      })
    }
  }, [result, form, onSuccess, onError])
}
