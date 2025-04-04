from fastapi import FastAPI
import uvicorn
from routes.profile import profile

app = FastAPI(title="Приложение для знакомств", description="Познакомьтесь с интересными людьми")

app.include_router(profile)

# --------------------------
# cors shit
from fastapi.middleware.cors import CORSMiddleware
#
# app = FastAPI()

# address of your live-server in quotes
origins = [
    "http://127.0.0.1:5555",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --------------------------

if __name__ == "__main__":
    uvicorn.run(app)


