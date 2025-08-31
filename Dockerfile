# Use Python 3.11
FROM python:3.11-slim

# Install OpenCV dependencies
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set workdir
WORKDIR /app

# Copy your code
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port (optional for local dev)
EXPOSE 5000

# Run Flask directly
CMD ["python", "app.py"]
