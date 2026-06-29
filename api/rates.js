const CURRENCIES = ["USD", "EUR", "SGD", "AUD", "MYR", "CHF"];

export default async function handler(req, res) {
  try {
    const results = await Promise.all(
      CURRENCIES.map(async (currency) => {
        const response = await fetch(
          `https://api.frankfurter.app/latest?from=${currency}&to=IDR`
        );
        const data = await response.json();
        return { currency, rate: data.rates.IDR, date: data.date };
      })
    );

    res.status(200).json({ rates: results });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rates" });
  }
}
