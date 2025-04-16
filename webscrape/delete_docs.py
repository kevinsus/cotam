# Libraries for mongodb connection
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
import os

# MongoDB connection => https://www.youtube.com/watch?v=UpsZDGutpZc&t=1143s
def get_collections_from_db():
    load_dotenv(find_dotenv())

    connection_string = os.environ.get("MONGODB_URI")
    client = MongoClient(connection_string)

    # Get all database in mongodb
    data_db = client.data
    courses_collections = data_db.courses
    return courses_collections

# Main function
def main(delete_year):
    courses_collections = get_collections_from_db()
    result = courses_collections.delete_many({ "year": delete_year })
    print(f"Deleted {result.deleted_count} documents from the collection.")

if __name__ == "__main__":
    main("2024")
