import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap1", // chọn cluster gần VN
  useTLS: true
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { message } = req.body;
  await pusher.trigger("chat-channel", "new-message", { text: message });
  res.status(200).send("Message sent");
}
