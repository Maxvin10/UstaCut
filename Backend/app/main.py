from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.bot import send_to_admin
import logging


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Booking(BaseModel):
    barber: str
    client_name: str
    phone: str
    date: str
    time: str
    service: str
    comment: str | None = None

BOOKED = set()


@app.post("/book")
async def book(data: Booking):
    key = f"{data.barber}_{data.date}_{data.time}"

    logger.info(f"Yangi book qilish: {data.client_name} | {key}")

    if key in BOOKED:
        logger.warning(f"Allaqachon book qilingan: {key}")
        return {"ok": False, "message": "Bu vaqt band"}

    BOOKED.add(key)
    logger.info(f"Booking tasdiqlandi: {key}")

    try:
        await send_to_admin(data)
        logger.info(f"Book qilgan odam: {data.client_name}")
    except Exception as e:
        logger.error(f"Error adminga jo'natildi: {e}")

    return {"ok": True}


@app.get("/available-times")
async def available_times(barber: str, date: str):
    logger.info(f"Checking available times for {barber} on {date}")

    all_times = ["9:00","10:00","11:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"]

    booked_times = [
        key.split("_")[2]
        for key in BOOKED
        if key.startswith(f"{barber}_{date}")
    ]

    available = [t for t in all_times if t not in booked_times]

    logger.info(f"Bo'sh vaqt return: {available}")

    return available
