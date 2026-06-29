export default function handler(req, res) {
  const name = req.query.name || "World";
  res.status(200).json({
    message: `Hello, ${name}!`,
    time: new Date().toLocaleTimeString(),
  });
}
