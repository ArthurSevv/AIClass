export function corrigirCodigo(codigo: string): string {
  if (codigo.includes("print")) {
    return "✅ Código correto!\nDica: Você usou 'print' corretamente."
  }

  return "❌ Código incorreto.\nErro: Nenhum 'print' encontrado.\nTente novamente."
}
