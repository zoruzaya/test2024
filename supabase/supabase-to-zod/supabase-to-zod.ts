import fs from "node:fs/promises";
import { join } from "node:path";
import prettier from "prettier";
import { generate } from "ts-to-zod";
import { z } from "zod";

import {
  getImportPath,
  transformTypes,
  transformTypesOptionsSchema,
} from "./lib";

const simplifiedJSDocTagSchema = z.object({
  name: z.string(),
  value: z.string().optional(),
});

const getSchemaNameSchema = z.function().args(z.string()).returns(z.string());

const nameFilterSchema = z.function().args(z.string()).returns(z.boolean());

const jSDocTagFilterSchema = z
  .function()
  .args(z.array(simplifiedJSDocTagSchema))
  .returns(z.boolean());

export const supabaseToZodOptionsSchema = transformTypesOptionsSchema
  .omit({ sourceText: true })
  .extend({
    getSchemaName: getSchemaNameSchema.optional(),
    input: z.string(),
    jsDocTagFilter: jSDocTagFilterSchema.optional(),
    keepComments: z.boolean().optional().default(false),
    maxRun: z.number().optional(),
    nameFilter: nameFilterSchema.optional(),
    output: z.string(),
    skipParseJSDoc: z.boolean().optional().default(false),
    skipValidation: z.boolean().optional(),
  });

export type SupabaseToZodOptions = z.infer<typeof supabaseToZodOptionsSchema>;

export default async function supabaseToZod(opts: SupabaseToZodOptions) {
  const inputPath = join(process.cwd(), opts.input);
  const outputPath = join(process.cwd(), opts.output);

  const sourceText = await fs.readFile(inputPath, "utf-8");

  const parsedTypes = transformTypes({ sourceText, ...opts });

  const { getZodSchemasFile } = generate({
    sourceText: parsedTypes,
    ...opts,
  });

  const zodSchemasFile = getZodSchemasFile(
    getImportPath(outputPath, inputPath),
  );

  const prettierConfig = await prettier.resolveConfig(process.cwd());

  const formattedSource = await prettier.format(zodSchemasFile, {
    parser: "babel-ts",
    ...prettierConfig,
  });
  await fs.writeFile(outputPath, formattedSource);
}
