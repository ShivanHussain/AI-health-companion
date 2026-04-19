# # type: ignore
# import pandas as pd 
# import torch
# from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
# from sklearn.preprocessing import LabelEncoder
# from datasets import Dataset   
# import os
# import joblib

# print("Training BERT Model...")

# # Load dataset
# df = pd.read_csv("data/dataset.csv")

# # clean column names
# df.columns = df.columns.str.strip().str.lower()

# #print("Columns:", df.columns)
# #print(df.head())


# # map  column
# if "text" not in df.columns:
#     if "description" in df.columns:
#         df = df.rename(columns={"description": "text"})
#     else:
#         raise ValueError("No text/description column found in dataset!")


# # Encode labels
# le = LabelEncoder()
# df["label"] = le.fit_transform(df["risk"])

# # keep only required columns
# df = df[["text", "label"]]

# # Convert to HF dataset
# dataset = Dataset.from_pandas(df)

# # Load tokenizer
# tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

# def tokenize(example):
#     return tokenizer(
#         example["text"],
#         padding="max_length",
#         truncation=True,
#         max_length=128
#     )

# dataset = dataset.map(tokenize, batched=True)

# # remove unused columns
# dataset = dataset.remove_columns(["text"])

# dataset = dataset.train_test_split(test_size=0.2)

# # Load model
# model = BertForSequenceClassification.from_pretrained(
#     "bert-base-uncased",
#     num_labels=len(le.classes_)
# )

# # Training args
# training_args = TrainingArguments(
#     output_dir="./model",
#     per_device_train_batch_size=8,
#     num_train_epochs=3,
#     logging_dir="./logs",
# )

# trainer = Trainer(
#     model=model,
#     args=training_args,
#     train_dataset=dataset["train"],
#     eval_dataset=dataset["test"],
# )

# # Train
# trainer.train()

# # Save model
# os.makedirs("model", exist_ok=True)

# model.save_pretrained("model/bert-model")
# tokenizer.save_pretrained("model/tokenizer")
# joblib.dump(le, "model/label_encoder.pkl")

# print("BERT Model Training Completed Successfully!")



import pandas as pd
import os
import joblib
import torch

from transformers import (
    BertTokenizer,
    BertForSequenceClassification,
    Trainer,
    TrainingArguments
)

from sklearn.preprocessing import LabelEncoder
from datasets import Dataset

print("🚀 Training BERT Model (FIXED VERSION)...")

# -------------------------
# LOAD DATA
# -------------------------
df = pd.read_csv("data/dataset.csv")
df.columns = df.columns.str.strip().str.lower()

# clean text
df["risk"] = df["risk"].str.lower().str.strip()

if "description" in df.columns:
    df = df.rename(columns={"description": "text"})

# -------------------------
# VALIDATE DATA
# -------------------------
df = df.dropna(subset=["text", "risk"])

print("Label distribution:")
print(df["risk"].value_counts())

# -------------------------
# FIXED LABEL ENCODING
# -------------------------
RISK_ORDER = ["low", "medium", "high"]

le = LabelEncoder()
le.fit(RISK_ORDER)

df["label"] = le.transform(df["risk"])

# -------------------------
# SHUFFLE DATA (IMPORTANT)
# -------------------------
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

# keep only required columns
df = df[["text", "label"]]

dataset = Dataset.from_pandas(df)

# -------------------------
# TOKENIZER
# -------------------------
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

def tokenize(batch):
    return tokenizer(
        batch["text"],
        padding="max_length",
        truncation=True,
        max_length=128
    )

dataset = dataset.map(tokenize, batched=True)

# remove text column
dataset = dataset.remove_columns(["text"])

dataset = dataset.train_test_split(test_size=0.2)

# -------------------------
# MODEL
# -------------------------
model = BertForSequenceClassification.from_pretrained(
    "bert-base-uncased",
    num_labels=len(RISK_ORDER)
)

# TRAINING CONFIG
training_args = TrainingArguments(
    output_dir="./model",

    eval_strategy="epoch",   
    save_strategy="epoch",      

    learning_rate=2e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,

    num_train_epochs=5,
    weight_decay=0.01,

    logging_steps=10,

    load_best_model_at_end=True    # now SAFE
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"]
)

# -------------------------
# TRAIN
# -------------------------
trainer.train()

# -------------------------
# SAVE MODEL
# -------------------------
os.makedirs("model", exist_ok=True)

model.save_pretrained("model/bert-model")
tokenizer.save_pretrained("model/tokenizer")
joblib.dump(le, "model/label_encoder.pkl")

print("🔥 Training Completed Successfully!")