import { useState } from "react";

export function PlayerGame() {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [isValidated, setIsValidated] = useState<boolean>(false);

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
      
      {/* 1. TOP BLACK BAR */}
      <div style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}>
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

      {/* 2. CENTRAL CONTENT */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px"
      }}>
        
        {/* White BUZZER title above */}
        <h1 style={{
          color: "#ffffff",
          fontSize: "36px",
          fontWeight: "normal",
          letterSpacing: "1px",
          marginBottom: "24px",
          textAlign: "center"
        }}>
          BUZZER
        </h1>

        {/* Central White Card */}
        <div style={{
          backgroundColor: "#ececec",
          width: "100%",
          maxWidth: "380px",
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "400px",
          boxSizing: "border-box"
        }}>
          
          <div>
            {/* Question / Time Info */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "15px",
              color: "#111111",
              marginBottom: "20px"
            }}>
              <span>Question 1/10</span>
              <span>Time - 05</span>
            </div>

            {/* BLANK COLOR BLOCKS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              {[0, 1, 2, 3].map((index) => {
                const isSelected = selectedOption === index;
                return (
                  <button
                    key={index}
                    onClick={() => !isValidated && setSelectedOption(index)}
                    disabled={isValidated}
                    style={{
                      width: "100%",
                      height: "38px",
                      border: "none",
                      outline: "none",
                      cursor: isValidated ? "default" : "pointer",
                      backgroundColor: isSelected ? "#8574f3" : "#d3d3d3",
                      transition: "background-color 0.15s ease",
                      opacity: isValidated && !isSelected ? 0.6 : 1
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Validate Button and small status */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <button
              onClick={() => setIsValidated(true)}
              disabled={isValidated}
              style={{
                backgroundColor: isValidated ? "#a5d6a7" : "#82f58e",
                color: isValidated ? "#444444" : "#000000",
                padding: "6px 24px",
                fontSize: "15px",
                fontFamily: "Georgia, serif",
                border: "none",
                outline: "none",
                cursor: isValidated ? "default" : "pointer",
                marginBottom: "16px"
              }}
            >
              Validate
            </button>

            <div style={{
              width: "100%",
              textAlign: "right",
              fontSize: isValidated ? "11px" : "14px",
              fontStyle: isValidated ? "italic" : "normal",
              color: isValidated ? "#2e7d32" : "#111111"
            }}>
              {isValidated ? "Response recorded" : "Waiting"}
            </div>
          </div>

        </div>

      </div>

      {/* 3. DISCONNECTED NOTICE BOTTOM RIGHT */}
      <div style={{ paddingRight: "24px", paddingBottom: "8px", textAlign: "right" }}>
        <span style={{ color: "#ff3333", fontWeight: "normal", fontSize: "22px" }}>
          Disconnected
        </span>
      </div>

      {/* 4. BOTTOM BLACK BAR */}
      <div style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        textAlign: "center",
        padding: "8px",
        fontSize: "13px",
        fontStyle: "italic"
      }}>
        Created by buzzer team - 2026
      </div>

    </div>
  );
}
