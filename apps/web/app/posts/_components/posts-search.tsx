'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '@labs/ui/components/input'

export function PostsSearch() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const query = searchParams.get('q') ?? ''
    const [value, setValue] = useState(query)
    const searchRef = useRef<HTMLDivElement>(null)
    const pendingWrites = useRef(new Set<string>())

    function replaceQuery(nextValue: string) {
        const trimmed = nextValue.trim()
        if (query === trimmed) return

        const params = new URLSearchParams(searchParams.toString())
        if (trimmed) {
            params.set('q', trimmed)
        } else {
            params.delete('q')
        }

        const nextQuery = params.toString()
        const href = nextQuery ? `${pathname}?${nextQuery}` : pathname
        pendingWrites.current.add(trimmed)
        router.replace(href, { scroll: false })
    }

    const debounced = useDebouncedCallback(replaceQuery, 300)

    useEffect(() => {
        if (pendingWrites.current.delete(query)) return

        pendingWrites.current.clear()
        debounced.cancel()
        setValue(query)
    }, [query, debounced])

    useEffect(() => {
        function focusSearch(event: KeyboardEvent) {
            if (
                event.key !== '/' ||
                event.defaultPrevented ||
                event.altKey ||
                event.ctrlKey ||
                event.metaKey
            )
                return

            const target = event.target
            if (
                target instanceof HTMLElement &&
                (target.isContentEditable ||
                    target.closest(
                        'input, textarea, select, [contenteditable]',
                    ))
            )
                return

            event.preventDefault()
            searchRef.current?.querySelector('input')?.focus()
        }

        document.addEventListener('keydown', focusSearch)
        return () => document.removeEventListener('keydown', focusSearch)
    }, [])

    return (
        <div
            ref={searchRef}
            role="search"
            className="group relative mt-space-8 w-full"
        >
            <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="pointer-events-none absolute top-1/2 left-space-4 -translate-y-1/2 text-text-muted"
            >
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4.5 4.5" />
            </svg>
            <Input
                type="search"
                aria-label="Buscar posts"
                placeholder="Buscar por título"
                value={value}
                onChange={(event) => {
                    const nextValue = event.target.value
                    setValue(nextValue)
                    debounced(nextValue)
                }}
                onKeyDown={(event) => {
                    if (event.key !== 'Escape' || (!value && !query)) return

                    event.preventDefault()
                    debounced.cancel()
                    setValue('')
                    replaceQuery('')
                    event.currentTarget.focus()
                }}
                className="h-space-12!  pl-space-12! pr-space-12! text-[16px]! [&::-webkit-search-cancel-button]:grayscale"
            />
            <kbd
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-space-4 hidden -translate-y-1/2 rounded-sm border border-line px-space-2 font-mono text-label text-text-muted sm:block group-focus-within:hidden p-1"
            >
                /
            </kbd>
        </div>
    )
}
