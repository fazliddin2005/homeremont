export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { name, phone, service, comment, type } = req.body;
  const BOT_TOKEN = '8833307412:AAF31LGeG5o-68k7IGzvNVVs-A48WDVFqU';
  const CHAT_ID = '1519856274';
  const prefix = type === 'master' ? '🔧 MASTER ZAYAVKA' : '🏠 Yangi zayavka';
  const text = prefix + ' - Nazafani Group\n\n' +
    '👤 Ism: ' + (name||'-') + '\n' +
    '📞 Telefon: ' + (phone||'-') + '\n' +
    '🔧 Xizmat: ' + (service||'-') + '\n' +
    '💬 Izoh: ' + (comment||'-') + '\n\n' +
    '⏰ ' + new Date().toLocaleString('ru-RU', {timeZone: 'Asia/Tashkent'});

  try {
    const r = await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });
    const d = await r.json();
    if (d.ok) return res.status(200).json({ success: true });
    return res.status(500).json({ error: d.description });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
