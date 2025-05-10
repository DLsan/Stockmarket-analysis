export function KnapsackExplainer() {
  return (
    <div className="text-sm text-muted-foreground space-y-3">
      <p>
        Our recommendation engine uses a modified <span className="highlight">Greedy Knapsack algorithm</span> to
        optimize your investment allocation based on your preferences.
      </p>

      <p>The algorithm considers multiple factors:</p>

      <ul className="list-disc pl-5 space-y-1">
        <li>Potential returns based on historical performance and analyst expectations</li>
        <li>Risk scores calculated from volatility, beta, and other metrics</li>
        <li>Market correlation to ensure proper diversification</li>
        <li>Your investment amount and risk tolerance preferences</li>
      </ul>

      <p>
        Unlike traditional portfolio optimization, our algorithm also considers the time horizon of your investments and
        adapts the weights accordingly.
      </p>
    </div>
  )
}

