# # type: ignore
# from fastapi import FastAPI
# from pydantic import BaseModel
# import torch
# from transformers import BertTokenizer, BertForSequenceClassification
# import joblib
# import uvicorn

# from utils.recommendation import generate_recommendations

# app = FastAPI()

# # Load model
# tokenizer = BertTokenizer.from_pretrained("model/tokenizer")
# model = BertForSequenceClassification.from_pretrained("model/bert-model")
# label_encoder = joblib.load("model/label_encoder.pkl")

# model.eval()

# class HealthInput(BaseModel):
#     type: str
#     description: str


# # Root API
# @app.get("/")
# def home():
#     return {"message": "AI Health API Running "}


# @app.post("/predict")
# def predict(data: HealthInput):
#     text = data.type + " " + data.description

#     inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)

#     with torch.no_grad():
#         outputs = model(**inputs)

#     logits = outputs.logits
#     pred = torch.argmax(logits, dim=1).item()

#     risk = label_encoder.inverse_transform([pred])[0]

#     score = 90
#     if risk == "High":
#         score = 40
#     elif risk == "Medium":
#         score = 70

#     recommendations = generate_recommendations(text, risk)

#     return {
#         "riskLevel": risk,
#         "healthScore": score,
#         "recommendations": recommendations
#     }


# if __name__ == "__main__":
#     uvicorn.run("app:app", host="0.0.0.0", port=5001, reload=True)


from fastapi import FastAPI
from pydantic import BaseModel
import torch
import joblib
from transformers import BertTokenizer, BertForSequenceClassification
import uvicorn

from utils.recommendation import generate_recommendations

app = FastAPI()

tokenizer = BertTokenizer.from_pretrained("model/tokenizer")
model = BertForSequenceClassification.from_pretrained("model/bert-model")
label_encoder = joblib.load("model/label_encoder.pkl")

model.eval()


class HealthInput(BaseModel):
    type: str
    description: str


@app.get("/")
def home():
    return {"status": "AI Health API Running"}


@app.post("/predict")
def predict(data: HealthInput):

    text = f"{data.type} {data.description}"

    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)

    with torch.no_grad():
        outputs = model(**inputs)

    pred = torch.argmax(outputs.logits, dim=1).item()

    risk = label_encoder.inverse_transform([pred])[0]

    if risk == "low":
        score = 85
    elif risk == "medium":
        score = 65
    else:
        score = 35

    recommendations = generate_recommendations(text, risk)

    return {
        "riskLevel": risk,
        "healthScore": score,
        "recommendations": recommendations
    }




if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5001, reload=True)