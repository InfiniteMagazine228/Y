export default function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;
    // xử lý tin nhắn, gọi Pusher trigger...
    res.status(200).json({ ok: true });
  } else {
    res.status(405).end();
  }
}
