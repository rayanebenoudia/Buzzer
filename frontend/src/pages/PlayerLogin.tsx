import { useState } from "react";

interface PlayerLoginProps {
  onJoin: (nickname: string, code: string) => void;
  onBack: () => void;
}

// Player Login screen component
export function PlayerLogin({ onJoin, onBack }: PlayerLoginProps) {
  const [nickname, setNickname] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim() && code.trim().length === 5) {
      onJoin(nickname, code.toUpperCase());
    } else {
      alert("Veuillez entrer un pseudo et un code de 5 lettres.");
    }
  };

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
      {/* Top Black Bar with Back Button */}
      <div style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#00bcd4",
            border: "2px solid #ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{ width: "20px", height: "8px", backgroundColor: "#ffffff", borderRadius: "4px" }}></div>
          </div>
          <span style={{ fontSize: "20px", fontWeight: "bold", fontStyle: "italic", letterSpacing: "1px" }}>
            BUZZER
          </span>
        </div>

        <button
          onClick={onBack}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "none",
            borderRadius: "20px",
            padding: "6px 16px",
            fontSize: "14px",
            fontFamily: "Georgia, serif",
            cursor: "pointer"
          }}
        >
          Retour
        </button>
      </div>

      {/* Central Content */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}>
        <div style={{
          backgroundColor: "#f2f2f2",
          width: "100%",
          maxWidth: "380px",
          padding: "36px 24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box"
        }}>
          <h1 style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#000000",
            margin: "0 0 28px 0"
          }}>
            Connexion
          </h1>

          <form onSubmit={handleSubmit} style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px"
          }}>
            <div style={{ width: "100%", textAlign: "center" }}>
              <label style={{ display: "block", fontSize: "20px", color: "#222222", marginBottom: "8px" }}>
                Pseudonyme
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Panda"
                style={{
                  width: "70%",
                  padding: "8px 16px",
                  fontSize: "18px",
                  color: "#000000",
                  borderRadius: "20px",
                  border: "2px solid #000000",
                  backgroundColor: "#e0ffff",
                  textAlign: "center",
                  outline: "none"
                }}
              />
            </div>

            <div style={{ width: "100%", textAlign: "center" }}>
              <label style={{ display: "block", fontSize: "20px", color: "#222222", marginBottom: "8px" }}>
                Entrer le code à 5 lettres
              </label>
              <input
                type="text"
                maxLength={5}
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="*****"
                style={{
                  width: "70%",
                  padding: "8px 16px",
                  fontSize: "18px",
                  color: "#000000",
                  borderRadius: "20px",
                  border: "2px solid #000000",
                  backgroundColor: "#e0ffff",
                  textAlign: "center",
                  outline: "none",
                  letterSpacing: "4px"
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#a5d6a7",
                color: "#000000",
                border: "2px solid #000000",
                borderRadius: "20px",
                padding: "8px 36px",
                fontSize: "18px",
                fontFamily: "Georgia, serif",
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              Rejoindre
            </button>
          </form>
        </div>
      </div>

      <div style={{ paddingRight: "24px", paddingBottom: "8px", textAlign: "right" }}>
        <span style={{ color: "#ff3333", fontSize: "20px" }}>
          Déconnecté
        </span>
      </div>

      <div style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        textAlign: "center",
        padding: "8px",
        fontSize: "13px",
        fontStyle: "italic"
      }}>
        Créé par l'équipe buzzer - 2026
      </div>
    </div>
  );
}
