const ALLOWED = ["USD", "EUR", "SGD", "AUD", "MYR", "CHF", "THB"];

export default async function handler(req, res) {
  const { currency } = req.query;

  if (!currency || !ALLOWED.includes(currency.toUpperCase())) {
    return res.status(400).json({ error: "Invalid or missing currency" });
  }

  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - 3);

  const startStr = start.toISOString().split("T")[0];
  const endStr = end.toISOString().split("T")[0];

  try {
    const response = await fetch(
      `https://api.frankfurter.app/${startStr}..${endStr}?from=${currency.toUpperCase()}&to=IDR`
    );
    const data = await response.json();

    const history = Object.entries(data.rates)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, rates]) => ({ date, rate: rates.IDR }));

    res.status(200).json({ currency: currency.toUpperCase(), history });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
}
