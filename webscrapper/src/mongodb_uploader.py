from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"), server_api=ServerApi('1'))
db = client["OutfitFactory"]
collection = db["garmentmodels"]

def upload(garments):
    collection.insert_many(garments)
