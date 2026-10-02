FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app/backend

COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./
RUN cp -a static /app/bundled_static

EXPOSE 8000

CMD ["sh", "-c", "cp -R /app/bundled_static/. /app/backend/static/ && alembic upgrade head && if [ \"${SEED_DEMO_CATALOG:-0}\" = \"1\" ]; then python -m scripts.seed_category; fi && uvicorn api.main:app --host 0.0.0.0 --port 8000"]
