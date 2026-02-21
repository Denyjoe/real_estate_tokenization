function OwnershipChart({ data }) {
  // CSS conic-gradient for pie: 50% 30% 20%
  const gradient = data
    .map((d, i) => {
      const start = data.slice(0, i).reduce((s, x) => s + x.percent, 0);
      return `${d.color} ${start}% ${start + d.percent}%`;
    })
    .join(', ');

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow">
      <h3 className="text-sm font-medium text-stellar-muted mb-4">Ownership by property</h3>
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div
          className="w-40 h-40 rounded-full flex-shrink-0 border-4 border-white shadow-inner"
          style={{ background: `conic-gradient(${gradient})` }}
          aria-hidden
        />
        <div className="flex-1 min-w-0 space-y-3">
          {data.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                  aria-hidden
                />
                <span className="text-stellar-dark truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="font-medium text-stellar-dark">{item.percent}%</span>
                <span className="text-stellar-muted">${item.totalValue.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OwnershipChart;
