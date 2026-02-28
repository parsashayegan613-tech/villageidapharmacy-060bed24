import os
from supabase import create_client, Client

# Hardcoded for the handshake check for simplicity, normally read from .env
url = "https://nbbpchwweyzpiurlluzz.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iYnBjaHd3ZXl6cGl1cmxsdXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNDE5MTgsImV4cCI6MjA4NzcxNzkxOH0.1Sk-mgVQLSyR00tClEjg0_iLxrJlGVyE3zWgnJHefl0"

def test_connection():
    try:
        supabase: Client = create_client(url, key)
        # Test query to appointments table
        response = supabase.table("appointments").select("*").limit(1).execute()
        print("✅ Handshake Success: Connected to Supabase and queried tables.")
        print(f"Data response status: {len(response.data)} records found (expected 0).")
    except Exception as e:
        print(f"❌ Handshake Failed: {str(e)}")

if __name__ == "__main__":
    test_connection()
