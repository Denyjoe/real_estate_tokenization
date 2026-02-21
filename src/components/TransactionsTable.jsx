function TransactionsTable({ transactions }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-card overflow-hidden">
      <div className="border-b border-gray-200 px-5 py-4">
        <h3 className="text-sm font-medium text-stellar-dark">Recent transactions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-5 py-3 text-left font-medium text-stellar-muted">Date</th>
              <th className="px-5 py-3 text-left font-medium text-stellar-muted">Action</th>
              <th className="px-5 py-3 text-left font-medium text-stellar-muted">Amount</th>
              <th className="px-5 py-3 text-left font-medium text-stellar-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr
                key={tx.id}
                className={`border-b border-gray-100 last:border-0 hover:bg-gray-50/70 ${
                  i % 2 === 1 ? 'bg-gray-50/40' : ''
                }`}
              >
                <td className="px-5 py-3 text-stellar-dark">{tx.date}</td>
                <td className="px-5 py-3 text-stellar-dark">{tx.action}</td>
                <td className="px-5 py-3 font-medium text-stellar-dark">{tx.amount}</td>
                <td className="px-5 py-3">
                  <span
                    className={
                      tx.status === 'Completed'
                        ? 'text-green-600'
                        : 'text-amber-600'
                    }
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsTable;
