import { toast } from 'sonner'

export const useToastMessage = () => {
  const success = (message: string, description?: string) => {
    toast.success(message, {
      description,

      style: {
        background: '#ecfdf5',
        color: '#065f46',
        border: '1px solid #10b981',
      },
    })
  }

  const error = (message: string, description?: string) => {
    toast.error(message, {
      description,

      style: {
        background: '#fef2f2',
        color: '#991b1b',
        border: '1px solid #ef4444',
      },
    })
  }

  const info = (message: string, description?: string) => {
    toast(message, {
      description,

      style: {
        background: '#eff6ff',
        color: '#1e40af',
        border: '1px solid #3b82f6',
      },
    })
  }

  const loading = (message: string) => {
    return toast.loading(message, {
      style: {
        background: '#f1f5f9',
        color: '#334155',
      },
    })
  }

  const dismiss = (id?: string | number) => {
    toast.dismiss(id)
  }

  return {
    success,
    error,
    info,
    loading,
    dismiss,
  }
}
