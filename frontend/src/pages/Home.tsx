import { useNavigate } from "react-router-dom";
import buzzerImg from "../assets/le_buzzer-removebg-preview.png";

export function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#85c5e5",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: "Georgia, serif",
      userSelect: "none"
    }}>
      {/* Top Black Bar */}
      <div style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "15px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <span style={{ fontSize: "24px", fontWeight: "bold", fontStyle: "italic", letterSpacing: "1px" }}>
          BUZZER
        </span>
        <button
          onClick={() => navigate("/host-login")}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "none",
            borderRadius: "20px",
            padding: "8px 20px",
            fontSize: "16px",
            fontFamily: "Georgia, serif",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Animateur
        </button>
      </div>

      {/* Central Content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px"
      }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#ffffff", fontSize: "36px", fontStyle: "italic", marginBottom: "10px", letterSpacing: "2px" }}>
            BUZZER
          </h1>
        </div>

        {/* Real Buzzer Image */}
        <div 
          onClick={() => navigate("/player-login")}
          style={{ cursor: "pointer", display: "flex", justifyContent: "center" }}
        >
          <img 
            src={buzzerImg} 
            alt="Buzzer" 
            style={{ 
              width: "280px", 
              height: "auto",
              filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.2))",
              transition: "transform 0.1s ease"
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.96)"}
            onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
          />
        </div>

        {/* Play Button */}
        <button
          onClick={() => navigate("/player-login")}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "2px solid #ffffff",
            borderRadius: "20px",
            padding: "10px 40px",
            fontSize: "18px",
            fontFamily: "Georgia, serif",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            marginTop: "10px"
          }}
        >
          Jouer
        </button>
      </div>

      {/* Bottom Black Bar */}
      <div style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        textAlign: "center",
        padding: "12px",
        fontSize: "14px",
        fontStyle: "italic"
      }}>
        Créé par l'équipe buzzer - 2026
      </div>
    </div>
  );
}
