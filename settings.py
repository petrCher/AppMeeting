from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DB_DSN: str = ""

def get_settings():
    return Settings()