"use client";

import { useState } from "react";
import { MdxEditor } from "@labs/ui/components/mdx/mdx-editor";

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
  const [content, setContent] = useState(exampleContent);

  return (
    <main className="mx-auto w-full max-w-[var(--content-width)] px-space-4 py-space-8 sm:px-space-6">
      <div className="mb-space-8">
        <h1 className="text-title text-text">Editor MDX</h1>
        <p className="mt-space-2 text-meta text-text-muted">
          Teste local do editor. As alterações não são salvas.
        </p>
      </div>

      <MdxEditor name="content" value={content} onChange={setContent} />
    </main>
  );
}
