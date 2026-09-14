const EXT_MAP = {
  docx: "docx",
  doc: "doc",
};

export function detectFormat(file) {
  const name = file?.name || "";
  const ext = name.split(".").pop()?.toLowerCase();
  const format = EXT_MAP[ext];

  if (!format) {
    throw new Error(`Неподдерживаемый формат файла: .${ext || "?"}`);
  }
  return format;
}
