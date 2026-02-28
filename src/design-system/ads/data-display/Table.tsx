interface TableColumn {
  key: string
  title: string
}

interface TableRow {
  id: string
  [key: string]: string
}

interface DataTableProps {
  columns: TableColumn[]
  rows: TableRow[]
}

export function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="ds-ads-table-wrap">
      <table className="ds-ads-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={`${row.id}-${column.key}`}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
