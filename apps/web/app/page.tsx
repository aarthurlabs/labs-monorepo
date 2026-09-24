import { MdxContent } from "@labs/ui/components/mdx/mdx-content";

const exampleContent = `# Cache na Weather API

## Problema

Descreva o problema que motivou o experimento.

## Solução

Explique a implementação em MDX. Você pode usar **Markdown**, listas e blocos de código.

### Próximos passos

- [ ] Documentar os resultados
- [ ] Revisar a estratégia de cache
`;

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[var(--content-width)] px-space-4 py-space-8 sm:px-space-6">
      <p className="text-meta text-text-muted">
        Visualização de teste com conteúdo demonstrativo, ainda sem sincronização
        com o Studio.
      </p>
      <MdxContent content={exampleContent} className="[&>h1:first-child]:mt-space-6" />
    </main>
  );
}
