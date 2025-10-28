import React, { useState, useEffect } from "react";
import "./App.css";
import splashImage from "./assets/metro ease.png"; // splash image

type Screen =
  | "splash"
  | "login"
  | "select"
  | "fare"
  | "payment"
  | "processing"
  | "success"
  | "ticket";

// 🟣 Magenta Line Station Data
type Station = {
  name: string;
  touristSpots: string[];
};

const magentaLine: Station[] = [
  { name: "Janakpuri West", touristSpots: ["Pacific Mall", "District Centre"] },
  { name: "Dabri Mor - Janakpuri South", touristSpots: ["Local Markets"] },
  { name: "Dashrathpuri", touristSpots: ["Mahavir Enclave Market"] },
  { name: "Palam", touristSpots: ["Air Force Museum", "Palam Village"] },
  { name: "Sadar Bazaar Cantonment", touristSpots: ["Cantonment Park"] },
  { name: "Terminal 1-IGI Airport", touristSpots: ["IGI Domestic Airport"] },
  { name: "Shankar Vihar", touristSpots: ["Military Area – Restricted"] },
  { name: "Vasant Vihar", touristSpots: ["Vasant Square Mall", "Embassy Area"] },
  { name: "Munirka", touristSpots: ["JNU Campus", "Deer Park"] },
  { name: "RK Puram", touristSpots: ["RK Puram Market"] },
  { name: "IIT Delhi", touristSpots: ["IIT Campus", "Hauz Khas Fort"] },
  { name: "Hauz Khas", touristSpots: ["Hauz Khas Village", "Deer Park", "Lake Complex"] },
  { name: "Panchsheel Park", touristSpots: ["Select Citywalk Mall", "Khirki Market"] },
  { name: "Chirag Delhi", touristSpots: ["Nehru Place", "Lotus Temple (Nearby)"] },
  { name: "Greater Kailash", touristSpots: ["M Block Market GK-II", "ISKCON Temple"] },
  { name: "Nehru Enclave", touristSpots: ["Lotus Temple", "Kalkaji Temple"] },
  { name: "Kalkaji Mandir", touristSpots: ["Kalkaji Temple", "Lotus Temple"] },
  { name: "Okhla NSIC", touristSpots: ["Okhla Industrial Area", "NSIC Grounds"] },
  { name: "Sukhdev Vihar", touristSpots: ["Okhla Bird Sanctuary", "Culinary Street"] },
  { name: "Jamia Millia Islamia", touristSpots: ["Jamia University Campus", "Okhla Vihar"] },
  { name: "Okhla Vihar", touristSpots: ["Okhla Bird Sanctuary"] },
  { name: "Jasola Vihar Shaheen Bagh", touristSpots: ["Shaheen Bagh Market"] },
  { name: "Kalindi Kunj", touristSpots: ["Atlantic Water World", "Kalindi Kunj Park"] },
  { name: "Okhla Bird Sanctuary", touristSpots: ["Okhla Bird Sanctuary", "Yamuna Riverfront"] },
  { name: "Botanical Garden", touristSpots: ["The Great India Place", "Worlds of Wonder"] },
];


function calculateFareAndTime(start: string, end: string) {
  const startIndex = magentaLine.findIndex((s) => s.name === start);
  const endIndex = magentaLine.findIndex((s) => s.name === end);
  if (startIndex === -1 || endIndex === -1) return { fare: 0, time: 0, distance: 0 };
  const distance = Math.abs(endIndex - startIndex);
  const fare = 10 + distance * 3;
  const time = distance * 2.5;
  return { fare, time, distance };
}

function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Auto move splash → login
  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => setScreen("login"), 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Auto move processing → success → ticket
  useEffect(() => {
    if (screen === "processing") {
      const timer = setTimeout(() => setScreen("success"), 4000);
      return () => clearTimeout(timer);
    }
    if (screen === "success") {
      const timer = setTimeout(() => setScreen("ticket"), 2000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const { fare, time } = calculateFareAndTime(fromStation, toStation);
  const toStationData = magentaLine.find((s) => s.name === toStation);

  // 🔒 Login validation
  const handleLogin = () => {
    if (
      (name === "AARUSH SINGH" && phone === "7428120324") ||
      (name === "Rachael Biju" && phone === "9354848491")
    ) {
      setError("");
      setScreen("select");
    } else {
      setError("Invalid name or phone number!");
    }
  };

  return (
    <div className="App">
      {/* Splash */}
      {screen === "splash" && (
        <div className="splash">
          <img src={splashImage} alt="Splash" className="splash-img" />
        </div>
      )}

      {/* 🔐 Login Screen */}
      {screen === "login" && (
        <div className="select-wrapper">
          <div className="select-box">
            <h2>Metro Ease Login</h2>
            <div style={{ marginTop: 20 }}>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Phone Number:</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      )}

      {/* Select Screen */}
      {screen === "select" && (
        <div className="select-wrapper">
          <div className="select-box">
            <h1>Welcome, {name} 👋</h1>
            <h3>Plan Your Metro Ride</h3>
            <label>From Station:</label>
            <select value={fromStation} onChange={(e) => setFromStation(e.target.value)}>
              <option value="">Select</option>
              {magentaLine.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
            <label>To Station:</label>
            <select value={toStation} onChange={(e) => setToStation(e.target.value)}>
              <option value="">Select</option>
              {magentaLine.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
            <button onClick={() => setScreen("fare")} disabled={!fromStation || !toStation}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Fare Screen */}
      {screen === "fare" && (
        <div className="select-wrapper">
          <div className="select-box">
            <h2>Journey Details</h2>
            <p><strong>Fare:</strong> ₹{fare}</p>
            <p><strong>ETA:</strong> {time.toFixed(1)} minutes</p>

            {toStationData && (
              <div className="tourist-spots">
                <h4>Nearby Tourist Attractions at {toStationData.name}</h4>
                <ul>
                  {toStationData.touristSpots.map((spot) => (
                    <li key={spot}>{spot}</li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={() => setScreen("payment")}>Continue to Payment</button>
          </div>
        </div>
      )}

      {/* Payment Screen */}
      {screen === "payment" && (
        <div className="select-wrapper">
          <div className="select-box">
            <h2>Payment</h2>
            <h3>Select Payment Method</h3>
            {["UPI", "Credit", "Debit", "NetBanking"].map((method) => (
              <div key={method}>
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setUpiId("");
                    setSecurityCode("");
                  }}
                />
                <label>{method}</label>
              </div>
            ))}

            {/* UPI Input */}
            {paymentMethod === "UPI" && (
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Enter your UPI ID (e.g. 9876543210@paytm)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
                {upiId && !/^\d{10}@paytm$/.test(upiId) && (
                  <p style={{ color: "red" }}>❌ Invalid UPI format. Must be 10 digits followed by @paytm</p>
                )}
              </div>
            )}
             
             {/* UPI Input */}
            {paymentMethod === "Credit" && (
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Enter your credit ID "
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
                {upiId && !/^\d{12}$/.test(upiId) && (
                  <p style={{ color: "red" }}>❌ Invalid credit format. </p>
                )}
              </div>
            )}

             {/* UPI Input */}
            {paymentMethod === "Debit" && (
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Enter your debit ID "
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
                {upiId && !/^\d{12}$/.test(upiId) && (
                  <p style={{ color: "red" }}>❌ Invalid debitformat. </p>
                )}
              </div>
            )}

             {/* UPI Input */}
            {paymentMethod === "NetBanking" && (
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Enter your card credential "
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
                {upiId && !/^\d{12}$/.test(upiId) && (
                  <p style={{ color: "red" }}>❌ Invalid UPI format. </p>
                )}
              </div>
            )}

            
            {/* Security PIN */}
            {paymentMethod && (
              <div style={{ marginTop: "20px" }}>
                <label>Enter 4-digit security PIN:</label>
                <input
                  type="password"
                  maxLength={4}
                  placeholder="Enter PIN"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                />
                {securityCode && securityCode.length !== 4 && (
                  <p style={{ color: "red" }}>PIN must be exactly 4 digits.</p>
                )}
              </div>
            )}

            <button
              style={{ marginTop: "20px" }}
              disabled={
                !paymentMethod ||
                (paymentMethod === "UPI" && !/^\d{10}@paytm$/.test(upiId)) ||
                securityCode.length !== 4
              }
              onClick={() => setScreen("processing")}
            >
              Verify & Proceed
            </button>
          </div>
        </div>
      )}

      {/* Processing */}
      {screen === "processing" && (
        <div className="splash">
          <h2>⏳ Checking your payment...</h2>
        </div>
      )}

      {/* Success */}
      {screen === "success" && (
        <div className="splash">
          <h2>✅ Payment Successful!</h2>
        </div>
      )}

      {/* Ticket */}
      {screen === "ticket" && (
        <div className="splash">
          <h2>🎟️ Here’s your QR Ticket</h2>
          <p>Enjoy your ride!</p>
          <div className="qr-box"></div>
          <button
            style={{ marginTop: "20px" }}
            onClick={() => {
              setFromStation("");
              setToStation("");
              setPaymentMethod("");
              setUpiId("");
              setScreen("login");
            }}
          >
            ⬅️ Back to Homepage
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
