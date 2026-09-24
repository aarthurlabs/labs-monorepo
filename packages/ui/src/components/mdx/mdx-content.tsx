import { evaluate } from '@mdx-js/mdx'
import * as jsxRuntime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'
import { cn } from '../../lib/cn'
import { mdxComponents } from './mdx-components'

export interface MdxContentProps {
    content: string
    className?: string
}

interface SyntaxNode {
    type?: unknown
    name?: unknown
    url?: unknown
    attributes?: unknown
    children?: unknown
}

function assertAllowedSyntax(node: SyntaxNode): void {
    if (
        node.type === 'mdxjsEsm' ||
        node.type === 'mdxFlowExpression' ||
        node.type === 'mdxTextExpression'
    ) {
        throw new Error('MDX imports, exports e expressões não são permitidos.')
    }

    if (
        node.type === 'mdxJsxFlowElement' ||
        node.type === 'mdxJsxTextElement'
    ) {
        if (
            node.name !== 'Callout' ||
            !Array.isArray(node.attributes) ||
            node.attributes.length > 0
        ) {
            throw new Error(
                'Apenas o componente <Callout> sem atributos é permitido no MDX.',
            )
        }
    }

    if (
        node.type === 'link' ||
        node.type === 'image' ||
        node.type === 'definition'
    ) {
        if (
            typeof node.url !== 'string' ||
            !['http:', 'https:', 'mailto:'].includes(
                new URL(node.url, 'https://content.invalid').protocol,
            )
        ) {
            throw new Error('URL não permitida no MDX.')
        }
    }

    if (Array.isArray(node.children)) {
        for (const child of node.children) {
            if (child && typeof child === 'object')
                assertAllowedSyntax(child as SyntaxNode)
        }
    }
}

function remarkRestrictMdx() {
    return (tree: SyntaxNode) => assertAllowedSyntax(tree)
}

export async function MdxContent({ content, className }: MdxContentProps) {
    const { default: Content } = await evaluate(content, {
        ...jsxRuntime,
        remarkPlugins: [remarkGfm, remarkRestrictMdx],
    })

    return (
        <div className={cn('min-w-0 text-text', className)}>
            <Content components={mdxComponents} />
        </div>
    )
}
