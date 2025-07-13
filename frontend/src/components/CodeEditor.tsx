import Editor from "@monaco-editor/react"

interface Props {
  codigo: string
  setCodigo: (codigo: string) => void
}

function CodeEditor({ codigo, setCodigo }: Props) {
  return (
    <div className="border rounded overflow-hidden">
      <Editor
        height="350px"
        defaultLanguage="python"
        defaultValue={codigo}
        value={codigo}
        theme="vs-dark"
        onChange={(value) => setCodigo(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  )
}

export default CodeEditor
