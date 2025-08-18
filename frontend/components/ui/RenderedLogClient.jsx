"use client"

const KeyValue = ({ item }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
    <span className="text-gray-600 text-sm">{item.label}:</span>
    <span className="text-gray-900 text-sm font-medium">{item.value || "Not Available"}</span>
  </div>
)

const Table = ({ item }) => (
  <div className="mt-4">
    {item.title && <h4 className="font-medium text-gray-900 mb-3">{item.title}</h4>}
    {item.rows && item.rows.length > 0 ? (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              {item.columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {item.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {item.columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-sm text-gray-900">
                    {row[col.key] || <span className="text-gray-400">Not Available</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-gray-500 text-sm">{item.empty}</p>
      </div>
    )}
  </div>
)

const Section = ({ section }) => (
  <div className="mb-6 border border-gray-200 rounded-lg bg-white">
    <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
      <h3 className="font-semibold text-gray-900">{section.title}</h3>
    </div>
    <div className="p-4">
      {section.items.map((item, index) => {
        switch (item.type) {
          case "kv":
            return <KeyValue key={index} item={item} />
          case "table":
            return <Table key={index} item={item} />
          default:
            return null
        }
      })}
    </div>
  </div>
)

const RenderedLogClient = ({ log }) => {
  if (!log || !log.rendered) {
    return (
      <div className="p-8 text-center bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No data to display.</p>
      </div>
    )
  }

  const { rendered } = log

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="">
        <header className="mb-6 border border-gray-200 rounded-lg bg-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{rendered.header.left.value}</h1>
              <p className="text-sm text-gray-500 mt-1">{rendered.header.left.label}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">{rendered.header.right.value}</p>
              <p className="text-sm text-gray-500">{rendered.header.right.label}</p>
            </div>
          </div>
        </header>

        <div className="space-y-4">
          {rendered.sections.map((section, index) => (
            <Section key={index} section={section} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RenderedLogClient
