from aiogram import Bot
from app.config import BOT_TOKEN, ADMIN_ID

bot = Bot(token=BOT_TOKEN)

async def send_to_admin(data):
    text = f"""
✂️ *Yangi bron*

👤 Mijoz: {data.client_name}\n
📞 Tel: {data.phone}\n
💈 Barber: {data.barber}\n
📅 Sana: {data.date}\n
⏰ Vaqt: {data.time}\n
🧾 Xizmat: {data.service}\n
💬 Izoh: {data.comment or '-'}
"""

    await bot.send_message(
        chat_id = ADMIN_ID,
        text = text,
        parse_mode="Markdown"
    )
