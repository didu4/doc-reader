export { detectFormat } from "./detect-format.js";
export { parseDocx } from "./docx-parser.js";
export { parseDoc } from "./doc-parser.js";

import { detectFormat } from "./detect-format.js";
import { parseDocx } from "./docx-parser.js";
import { parseDoc } from "./doc-parser.js";

export async function loadDocument(file) {
  const format = detectFormat(file);

  if (format === "docx") {
    const result = await parseDocx(file);
    return { ...result, format };
  }
  if (format === "doc") {
    const result = await parseDoc(file);
    return { ...result, format };
  }

  throw new Error(`Парсер для формата ${format} отсутствует`);
}
