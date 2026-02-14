import React, { useMemo, useState, useEffect } from "react";
import "./book.css";

function Book() {
  const barbers = useMemo(
    () => [
      {
        id: "b1",
        name: "Sardor",
        specialty: "Fade, klassik soch olish",
        rating: 4.9,
        price: 100000,
        image:
          "https://media.istockphoto.com/id/1365608023/photo/shot-of-a-handsome-young-barber-standing-alone-in-his-salon.jpg?s=612x612&w=0&k=20&c=0l2Q3UVgXNnf3lbUvMM7hT18-AAnOloeoNMOHntomcw=",
      },
      {
        id: "b2",
        name: "Begzod",
        specialty: "Soqol va klassik uslublar",
        rating: 4.7,
        price: 90000,
        image:
          "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: "b3",
        name: "Kamron",
        specialty: "Zamonaviy stil",
        rating: 4.8,
        price: 110000,
        image:
          "https://media.istockphoto.com/id/1365608023/photo/shot-of-a-handsome-young-barber-standing-alone-in-his-salon.jpg?s=612x612&w=0&k=20&c=0l2Q3UVgXNnf3lbUvMM7hT18-AAnOloeoNMOHntomcw=",
      },
    ],
    [],
  );

  const [selectedBarber, setBarber] = useState(null);
  const [clientName, setName] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [comment, setComment] = useState("");
  const [existTimes, setTimes] = useState([]);

  const services = ["Klassik soch olish", "Soqol olish", "Soqol + soch"];

  const times = [
    "9:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  useEffect(() => {
    if (!selectedBarber || !date) return;

    const fetchAvailableTimes = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/available-times?barber=${selectedBarber.name}&date=${date}`,
        );
        if (!res.ok) throw new Error("Xatolik yuz berdi");
        const times = await res.json();
        setTimes(times);
        setTime("");
      } catch (err) {
        console.error(err);
        alert("Server bilan aloqa yo'q");
      }
    };

    fetchAvailableTimes();
  }, [selectedBarber, date]);

  const appointment = async (e) => {
    e.preventDefault();

    if (!selectedBarber) {
      alert("Barber tanlang");
      return;
    }

    const payload = {
      barber: selectedBarber.name,
      client_name: clientName,
      phone: phoneNumber,
      date: date,
      time: time,
      service: service,
      comment: comment,
    };

    try {
      const res = await fetch("http://localhost:8000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Bron muvaffaqiyatli yuborildi!");
      } else {
        alert("Xatolik yuz berdi");
      }
    } catch (err) {
      console.error(err);
      alert("Server bilan aloqa yo'q");
    }
  };

  return (
    <div className="book">
      <div className="book-header">
        <h2 className="bron">Barber tanlang va bron qiling</h2>
        <p>O'zingizga mos sartaroshni tanlab, vaqtni band qiling.</p>
      </div>

      <div className="book-layout">
        <section className="barbers-list">
          <h3>Sartaroshlar</h3>

          <div className="barbers-grid">
            {barbers.map((barber) => (
              <div
                key={barber.id}
                className={`barber-card ${
                  selectedBarber?.id === barber.id ? "active" : ""
                }`}
                onClick={() => setBarber(barber)}
              >
                <img src={barber.image} alt={barber.name} />
                <h4>{barber.name}</h4>
                <p>{barber.specialty}</p>
                <span>⭐ {barber.rating}</span>
                <strong>{barber.price.toLocaleString()} so'm</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="order-panel">
          <h3>Buyurtma qilish</h3>
          {selectedBarber ? (
            <div className="selected-barber">
              <img src={selectedBarber.image} alt={selectedBarber.name} />
              <div>
                <strong>{selectedBarber.name}</strong>
                <p>{selectedBarber.specialty}</p>
              </div>
            </div>
          ) : (
            <p className="hint">Iltimos, sartarosh tanlang</p>
          )}

          <form className="order-form" onSubmit={appointment}>
            <label>
              Ism-familiya
              <input
                type="text"
                placeholder="Ismingiz"
                value={clientName}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Telefon raqam
              <input
                type="tel"
                placeholder="+998 90 000 00 00"
                value={phoneNumber}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </label>

            <div className="row">
              <label>
                Sana
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </label>
              <label>
                Vaqt
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                >
                  <option value="">Tanlang</option>
                  {existTimes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Xizmat turi
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
              >
                <option value="">Tanlang</option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Izoh (ixtiyoriy)
              <textarea
                rows="3"
                placeholder="Qo'shimcha istaklar"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </label>
            <button className="btn-primary" type="submit">
              Bron qilish
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Book;
