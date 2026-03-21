'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import { CheckCircle2, Info, AlertCircle, XCircle, Loader2 } from 'lucide-react'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="size-5 text-green-500" />,
        info: <Info className="size-5 text-blue-500" />,
        warning: <AlertCircle className="size-5 text-amber-500" />,
        error: <XCircle className="text-destructive size-5" />,
        loading: (
          <Loader2 className="text-muted-foreground size-5 animate-spin" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            'group !bg-white dark:!bg-zinc-950 !text-zinc-900 dark:!text-zinc-100 ' +
            '!border-zinc-200 dark:!border-zinc-800 !shadow-xl !rounded-xl !p-4 !flex !items-start !gap-3',
          title: '!font-medium !text-[15px]',
          description: '!text-zinc-500 dark:!text-zinc-400 !text-sm',
          closeButton:
            '!bg-white dark:!bg-zinc-900 !border-zinc-200 dark:!border-zinc-800 ' +
            '!text-zinc-500 hover:!text-zinc-900 !transition-all !shadow-sm',
          actionButton:
            '!bg-zinc-900 !text-white dark:!bg-white dark:!text-zinc-900',
          cancelButton: '!bg-zinc-100 !text-zinc-900',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
