import mammoth from "mammoth";

export async function parseDocx(input) {
  const arrayBuffer =
    input instanceof ArrayBuffer ? input : await input.arrayBuffer();

  const result = await mammoth.convertToHtml({ arrayBuffer });
  return {
    html: result.value,
    messages: result.messages,
  };
}
