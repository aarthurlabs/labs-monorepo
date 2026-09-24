'use client'

import { useId, useRef, useState } from 'react'
import { cn } from '../../lib/cn'
import { DropdownMenu, DropdownMenuItem } from '../dropdown-menu'

export interface MdxEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    disabled?: boolean
    className?: string
    name?: string
}

interface Section {
    title: string
    level: number
    position: number
    line: number
}

function getSections(value: string): Section[] {
    const sections: Section[] = []
    let position = 0
    let fence: string | undefined
    const lines = value.split('\n')

    for (let index = 0; index < lines.length; index++) {
        const line = lines[index]
        const fenceMatch = /^ {0,3}(`{3,}|~{3,})/.exec(line)

        if (fenceMatch) {
            const marker = fenceMatch[1]
            if (!fence) {
                fence = marker
            } else if (
                marker[0] === fence[0] &&
                marker.length >= fence.length &&
                /^ {0,3}(?:`{3,}|~{3,})[ \t]*$/.test(line)
            ) {
                fence = undefined
            }
        } else if (!fence) {
            const heading =
                /^ {0,3}(#{1,6})[ \t]+(.+?)(?:[ \t]+#+)?[ \t]*$/.exec(line)
            if (heading) {
                sections.push({
                    title: heading[2],
                    level: heading[1].length,
                    position,
                    line: index + 1,
                })
            }
        }

        position += line.length + 1
    }

    return sections
}

export function MdxEditor({
    value,
    onChange,
    placeholder = 'Escreva livremente em MDX...',
    disabled = false,
    className,
    name,
}: MdxEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const textareaId = useId()
    const [cursor, setCursor] = useState(0)
    const sections = getSections(value)
    const beforeCursor = value.slice(0, Math.min(cursor, value.length))
    const line = beforeCursor.split('\n').length
    const column = beforeCursor.length - beforeCursor.lastIndexOf('\n')
    const words = value.trim() ? value.trim().split(/\s+/).length : 0
    const readingMinutes = Math.max(1, Math.ceil(words / 200))

    function updateCursor() {
        setCursor(textareaRef.current?.selectionStart ?? 0)
    }

    function goToSection(section: Section) {
        const textarea = textareaRef.current
        if (!textarea) return
        textarea.focus()
        textarea.setSelectionRange(section.position, section.position)
        setCursor(section.position)
        const lineHeight = Number.parseFloat(
            getComputedStyle(textarea).lineHeight,
        )
        if (Number.isFinite(lineHeight)) {
            textarea.scrollTop = (section.line - 1) * lineHeight
        }
    }

    return (
        <div className={cn('min-w-0', className)}>
            <div className="mb-space-3 flex items-center justify-between gap-space-3">
                <label
                    htmlFor={textareaId}
                    className="text-label font-semibold uppercase tracking-[var(--type-label-letter-spacing)] text-text-muted"
                >
                    Conteúdo <span aria-hidden="true">·</span> MDX
                </label>
                <DropdownMenu
                    label="Seções do conteúdo"
                    trigger={
                        <button
                            type="button"
                            disabled={disabled}
                            className="inline-flex h-7 items-center rounded-sm px-space-2 text-meta text-text-muted transition-colors hover:bg-surface-raised hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Seções
                        </button>
                    }
                >
                    {sections.length ? (
                        sections.map((section) => (
                            <DropdownMenuItem
                                key={`${section.line}-${section.title}`}
                                onClick={() => goToSection(section)}
                                className="gap-space-2"
                            >
                                <span
                                    aria-hidden="true"
                                    className="font-mono text-text-muted"
                                >
                                    {'#'.repeat(section.level)}
                                </span>
                                <span className="truncate">
                                    {section.title}
                                </span>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <DropdownMenuItem disabled>
                            Nenhuma seção
                        </DropdownMenuItem>
                    )}
                </DropdownMenu>
            </div>

            <div className="overflow-hidden rounded-md border border-line bg-surface transition-colors focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-500/20">
                <textarea
                    ref={textareaRef}
                    id={textareaId}
                    name={name}
                    value={value}
                    onChange={(event) => {
                        onChange(event.currentTarget.value)
                        setCursor(event.currentTarget.selectionStart)
                    }}
                    onSelect={updateCursor}
                    onClick={updateCursor}
                    onKeyUp={updateCursor}
                    placeholder={placeholder}
                    disabled={disabled}
                    spellCheck={false}
                    className="block min-h-[400px] w-full resize-y bg-transparent px-space-4 py-space-4 font-mono text-meta leading-[22px] text-text caret-brand-500 outline-none placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-50"
                />
                <div className="flex flex-wrap gap-x-space-4 gap-y-space-1 border-t border-line px-space-4 py-space-2 font-mono text-label text-text-muted">
                    <span>
                        Ln {line}, Col {column}
                    </span>
                    <span>{words} palavras</span>
                    <span>~{readingMinutes} min leitura</span>
                </div>
            </div>
        </div>
    )
}
