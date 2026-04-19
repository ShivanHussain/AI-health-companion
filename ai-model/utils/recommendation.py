def generate_recommendations(text, risk):
    rec = []
    text = text.lower()


    # Mental health
    if any(word in text for word in ["stress", "anxiety", "depressed", "pressure"]):
        rec.append("Practice meditation, yoga, and deep breathing exercises")
        rec.append("Avoid overthinking and take short breaks during work")

    # Sleep issues
    if any(word in text for word in ["sleep", "insomnia", "sleepless", "tired after sleep"]):
        rec.append("Maintain fixed sleep schedule (7-8 hours daily)")
        rec.append("Avoid mobile/screens 1 hour before sleep")

    # Weakness / fatigue
    if any(word in text for word in ["tired", "weak", "fatigue", "low energy", "dizziness"]):
        rec.append("Improve diet with protein, fruits, and hydration")
        rec.append("Do light exercise or morning walk daily")

    # Fever / infection
    if any(word in text for word in ["fever", "cold", "cough", "infection"]):
        rec.append("Take rest and stay hydrated with warm fluids")
        rec.append("Monitor temperature regularly")

    # Headache / pain
    if any(word in text for word in ["headache", "pain", "migraine"]):
        rec.append("Avoid screen time and take proper rest")
        rec.append("Stay in a calm and dark environment")

    # Breathing / serious symptoms
    if any(word in text for word in ["breathless", "chest pain", "shortness of breath"]):
        rec.append("Seek immediate medical attention")

    # RISK BASED RULES

    if risk.lower() == "high":
        rec.append("High risk detected: Consult a doctor immediately")
        rec.append("Avoid self-medication without professional advice")

    elif risk.lower() == "medium":
        rec.append("Moderate risk: Monitor symptoms closely")
        rec.append("If symptoms increase, consult a healthcare professional")

    else:
        rec.append("Low risk: Maintain healthy lifestyle habits")
        rec.append("Continue regular exercise and balanced diet")

    # REMOVE DUPLICATES
    rec = list(dict.fromkeys(rec))

    return rec