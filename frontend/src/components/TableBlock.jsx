export default function TableBlock({ table }) {
  if (!table || !table.rows || table.rows.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold text-gray-300 mb-4">{table.caption}</h3>
      
      <div className="overflow-x-auto bg-dark-900/50 rounded-lg border border-white/20 p-4">
        <table className="min-w-full text-sm text-gray-300">
          <thead>
            <tr className="border-b-2 border-vision/30">
              {table.headers.map((header, i) => (
                <th key={i} className="px-4 py-3 text-left font-bold text-vision whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {table.rows.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-white/5 transition-colors ${
                  row.highlight ? "bg-vision/20 border-l-4 border-vision" : ""
                }`}
              >
                <td className="px-4 py-3 text-center font-semibold">{row.rank}</td>
                <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">{row.id}</td>
                <td className="px-4 py-3 font-bold text-vision text-base">{row.f1}</td>
                <td className="px-4 py-3">{row.accuracy}</td>
                <td className="px-4 py-3">{row.precision}</td>
                <td className="px-4 py-3">{row.recall}</td>
                <td className="px-4 py-3 text-gray-300 max-w-md">{row.models}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
