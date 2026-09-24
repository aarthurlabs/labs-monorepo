import { LabMark } from '@labs/ui/components/brand/lab-mark'

export function WhatLearned({
    title,
    content,
}: {
    title: string
    content: string
}) {
    if (!title.trim() && !content.trim()) return null

    return (
        <section
            aria-label="O que aprendi"
            className="relative mt-space-12 overflow-hidden rounded-lg border border-line bg-surface p-space-6 shadow-[var(--shadow-card)]"
        >
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-[60px] -right-[40px] h-[140px] w-[180px] rounded-full bg-glow opacity-70 blur-[48px]"
            />
            <div className="relative flex items-center gap-space-2 font-mono text-label uppercase tracking-wide text-accent-text">
                <LabMark decorative className="inline-block size-4 shrink-0" />O
                QUE APRENDI
            </div>
            {title && (
                <h2 className="relative mt-space-3 text-heading font-semibold text-text">
                    {title}
                </h2>
            )}
            {content && (
                <p className="relative mt-space-1 whitespace-pre-wrap text-body text-text">
                    {content}
                </p>
            )}
        </section>
    )
}
