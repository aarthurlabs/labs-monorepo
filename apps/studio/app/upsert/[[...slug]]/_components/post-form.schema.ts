import { z } from "zod";

const requiredText = (message: string) =>
  z.string().refine((value) => value.trim().length > 0, { message });

export const postFormSchema = z.object({
  title: requiredText("Informe o título."),
  description: requiredText("Informe a descrição."),
  type: z.enum(["PROJECT", "NOTE", "EXPERIMENT"]),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  number: z
    .number()
    .int("Use um número inteiro.")
    .positive("Use um número positivo.")
    .optional(),
  tags: z.array(requiredText("A tag não pode estar vazia.")),
  repositoryUrl: z.union([z.literal(""), z.url("Informe uma URL válida.")]),
  liveUrl: z.union([z.literal(""), z.url("Informe uma URL válida.")]),
  featured: z.boolean(),
  publishedAt: z.union([z.literal(""), z.iso.date("Informe uma data válida.")]),
  learnedTitle: requiredText("Informe o título do aprendizado."),
  learnedContent: requiredText("Informe o conteúdo do aprendizado."),
  content: requiredText("Informe o conteúdo em MDX."),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
