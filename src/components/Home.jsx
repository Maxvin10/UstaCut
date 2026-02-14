import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
    const navigate = useNavigate();
    const booking = () => {
        navigate("/book");
    }
    
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-container">
          <div className="hero-text">
            <h1>
              Premium <span>Sartarosh</span> xizmatlari
            </h1>
            <p>Soch, soqol olish xizmatlari online band qiling</p>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={booking}>Xoziroq buron qilish </button>
              <button className="btn-outline">Xizmatlarni ko'rish</button>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://img.freepik.com/premium-photo/barber-cuts-hair-client-with-scissors-close-up-attractive-male-is-getting-modern-haircut-barber-shop-handheld-shot-4k_222877-9559.jpg"
              alt="Barber"
            />
          </div>
        </div>
      </section>

      <section className="services">
        <h2>Bizning xizmatlar</h2>

        <div className="service-list">
          <div className="service-card">
            <h3>Soch olish</h3>
            <span>100 000 so'm</span>
            <p>Istalgan still da soch olish</p>
          </div>

          <div className="service-card">
            <h3>Mo'ylov/Soqol olish</h3>
            <span>50 000 so'm</span>
            <p>Chiroyli ko'rinish</p>
          </div>

          <div className="service-card">
            <h3>To'liq to'plam</h3>
            <span>150 000 so'm</span>
            <p>Soch, Soqollarni sifatli tarzda olish</p>
          </div>
        </div>
      </section>

      <section className="barbers">
        <h2>Bizning jamoa</h2>

        <div className="barber-list">
          {["Sardor", "Begzod", "Kamron"].map((name, i) => (
            <div className="barber-card" key={i}>
              <img src="https://media.istockphoto.com/id/1365608023/photo/shot-of-a-handsome-young-barber-standing-alone-in-his-salon.jpg?s=612x612&w=0&k=20&c=0l2Q3UVgXNnf3lbUvMM7hT18-AAnOloeoNMOHntomcw=" />
              <div>
                <h3>{name}</h3>
                <p>Mutaxassis</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="steps">
        <h2>Ishlash tizimi</h2>

        <div className="step-list">
          <div className="step">
            1 <p>Xizmatni tanlang</p>
          </div>
          <div className="step">
            2 <p>Kun hamda vaqtni tanlang</p>
          </div>
          <div className="step">
            3 <p>Buron qilishni tasdiqlang</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Chiroyli ko'rinishga tayyormisiz?</h2>
        <p>Hoziroq joyingizni band qiling.</p>
        <button className="btn-primary" onClick={booking}>Buron qilish</button>
      </section>

      <footer className="footer">
        2026 BarberShop. Nima yozishni bilmadim.
      </footer>
    </div>
  );
}

export default Home;
