'use client'

import { Search, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useDebounceSearch } from '@/hooks/use-debounce-search'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchInputProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  showClearButton?: boolean
  debounceDelay?: number
}

export const SearchInput = ({
  value = '',
  onChange,
  placeholder = 'Tìm kiếm...',
  className,
  showClearButton = true,
  debounceDelay = 500,
}: SearchInputProps) => {
  const { searchValue, handleInputChange, resetSearch } = useDebounceSearch({
    onSearch: onChange,
    delay: debounceDelay,
    initialValue: value,
  })

  return (
    <div className={cn('relative', className)}>
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        className={cn('pl-9', showClearButton && searchValue && 'pr-8')}
      />

      {showClearButton && searchValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2"
          onClick={resetSearch}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Clear</span>
        </Button>
      )}
    </div>
  )
}
