import csv
import time
import requests
import os

# API_URL = "http://localhost:5000/api/sensors/data"
API_URL=os.loadenv('API_URL')

def send_data(row):
    try:
        payload = {
            "temperature": float(row["temperature"]),
            "humidity": float(row["humidity"])
        }
        response = requests.post(API_URL, json=payload)
        if response.status_code == 201:
            print("Data sent successfully:", payload)
        else:
            print("Failed to send data:", response.text)
    except Exception as e:
        print("Error:", e)

# Fix: Use a proper parameter without incorrect annotations
def read_and_send(file_path):
    with open(file_path, "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            send_data(row)
            time.sleep(1)

if __name__ == "__main__":
    # Update the correct dataset path here
    dataset_path = "../DATA-large.CSV/DATA-large.CSV"
    read_and_send(dataset_path)
