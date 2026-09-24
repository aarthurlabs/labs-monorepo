import { isValidElement, type ComponentProps, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Callout } from '../callout'
import { CodeBlock } from '../code-block'

function CodeFence({ children }: ComponentProps<'pre'>) {
    if (
        !isValidElement<{ className?: string; children?: ReactNode }>(children)
    ) {
        return (
            <pre className="my-space-6 overflow-x-auto rounded-md border border-line bg-surface p-space-4 font-mono text-meta">
                {children}
            </pre>
        )
    }

    const code = children.props.children
    const language = /(?:^|\s)language-([\w-]+)/.exec(
        children.props.className ?? '',
    )?.[1]

    return (
        <CodeBlock
            className="my-space-6"
            code={typeof code === 'string' ? code.replace(/\n$/, '') : ''}
            language={language}
        />
    )
}

export const mdxComponents = {
    h1: ({ className, ...props }: ComponentProps<'h1'>) => (
        <h1
            className={cn(
                'mt-space-12 mb-space-4 text-title text-text',
                className,
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }: ComponentProps<'h2'>) => (
        <h2
            className={cn(
                'mt-space-8 mb-space-3 text-heading text-text',
                className,
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: ComponentProps<'h3'>) => (
        <h3
            className={cn(
                'mt-space-6 mb-space-2 text-body font-semibold text-text',
                className,
            )}
            {...props}
        />
    ),
    p: ({ className, ...props }: ComponentProps<'p'>) => (
        <p
            className={cn('my-space-4 text-body text-text', className)}
            {...props}
        />
    ),
    a: ({ className, ...props }: ComponentProps<'a'>) => (
        <a
            className={cn(
                'text-accent-text underline underline-offset-4 hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text',
                className,
            )}
            {...props}
        />
    ),
    strong: ({ className, ...props }: ComponentProps<'strong'>) => (
        <strong
            className={cn('font-semibold text-text', className)}
            {...props}
        />
    ),
    em: ({ className, ...props }: ComponentProps<'em'>) => (
        <em className={cn('italic', className)} {...props} />
    ),
    ul: ({ className, ...props }: ComponentProps<'ul'>) => (
        <ul
            className={cn(
                'my-space-4 space-y-space-2 pl-space-6 text-body text-text [&_input]:accent-brand-500',
                className?.includes('contains-task-list')
                    ? 'list-none'
                    : 'list-disc',
                className,
            )}
            {...props}
        />
    ),
    ol: ({ className, ...props }: ComponentProps<'ol'>) => (
        <ol
            className={cn(
                'my-space-4 list-decimal space-y-space-2 pl-space-6 text-body text-text',
                className,
            )}
            {...props}
        />
    ),
    li: ({ className, ...props }: ComponentProps<'li'>) => (
        <li className={cn('pl-space-1', className)} {...props} />
    ),
    blockquote: ({ className, ...props }: ComponentProps<'blockquote'>) => (
        <blockquote
            className={cn(
                'my-space-6 border-l-2 border-brand-500 pl-space-4 text-body text-text-muted',
                className,
            )}
            {...props}
        />
    ),
    code: ({ className, ...props }: ComponentProps<'code'>) => (
        <code
            className={cn(
                'rounded-sm bg-surface-raised px-space-1 py-[2px] font-mono text-meta text-accent-text',
                className,
            )}
            {...props}
        />
    ),
    pre: CodeFence,
    hr: ({ className, ...props }: ComponentProps<'hr'>) => (
        <hr
            className={cn(
                'my-space-8 border-0 border-t border-line',
                className,
            )}
            {...props}
        />
    ),
    table: ({ className, ...props }: ComponentProps<'table'>) => (
        <div className="my-space-6 overflow-x-auto rounded-md border border-line">
            <table
                className={cn(
                    'w-full border-collapse text-left text-small text-text',
                    className,
                )}
                {...props}
            />
        </div>
    ),
    thead: ({ className, ...props }: ComponentProps<'thead'>) => (
        <thead className={cn('bg-surface-raised', className)} {...props} />
    ),
    tbody: ({ className, ...props }: ComponentProps<'tbody'>) => (
        <tbody className={cn('bg-surface', className)} {...props} />
    ),
    tr: ({ className, ...props }: ComponentProps<'tr'>) => (
        <tr
            className={cn('border-b border-line last:border-b-0', className)}
            {...props}
        />
    ),
    th: ({ className, ...props }: ComponentProps<'th'>) => (
        <th
            className={cn(
                'px-space-3 py-space-2 font-semibold text-text',
                className,
            )}
            {...props}
        />
    ),
    td: ({ className, ...props }: ComponentProps<'td'>) => (
        <td
            className={cn('px-space-3 py-space-2 text-text-muted', className)}
            {...props}
        />
    ),
    Callout,
}
