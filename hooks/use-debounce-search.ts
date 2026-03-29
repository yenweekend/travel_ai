import { useState, useCallback, useEffect, useRef, ChangeEvent } from 'react'
import debounce from 'lodash.debounce'

interface UseDebounceSearchProps {
  onSearch: (value: string) => void
  delay?: number
  initialValue?: string
}

export const useDebounceSearch = ({
  onSearch,
  delay = 500,
  initialValue = '',
}: UseDebounceSearchProps) => {
  const [searchValue, setSearchValue] = useState(initialValue)
  const debouncedSearchRef = useRef<ReturnType<typeof debounce> | null>(null)
  const onSearchRef = useRef(onSearch)
  const lastSyncedValueRef = useRef(initialValue)
  const isInternalUpdateRef = useRef(false)

  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  useEffect(() => {
    if (debouncedSearchRef.current) {
      debouncedSearchRef.current.cancel()
    }

    debouncedSearchRef.current = debounce((value: string) => {
      onSearchRef.current(value)
    }, delay)

    return () => {
      debouncedSearchRef.current?.cancel()
      debouncedSearchRef.current = null
    }
  }, [delay])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    isInternalUpdateRef.current = true
    setSearchValue(value)
    lastSyncedValueRef.current = value
    debouncedSearchRef.current?.(value)
  }, [])

  const resetSearch = useCallback(() => {
    isInternalUpdateRef.current = true
    setSearchValue('')
    lastSyncedValueRef.current = ''
    debouncedSearchRef.current?.cancel()
    onSearchRef.current('')
  }, [])

  useEffect(() => {
    let timeoutId: number | null = null

    if (
      !isInternalUpdateRef.current &&
      initialValue !== lastSyncedValueRef.current
    ) {
      lastSyncedValueRef.current = initialValue
      timeoutId = requestAnimationFrame(() => {
        setSearchValue(initialValue)
      })
    }

    isInternalUpdateRef.current = false

    return () => {
      if (timeoutId !== null) {
        cancelAnimationFrame(timeoutId)
      }
    }
  }, [initialValue])

  return {
    searchValue,
    setSearchValue,
    handleInputChange,
    resetSearch,
  }
}
