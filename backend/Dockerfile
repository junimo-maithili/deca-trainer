# Use Python 3.11
FROM python:3.11-slim

# Install OpenCV dependencies
RUN

# Set workdir
WORKDIR /app

# Copy your code
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 5000

# Run Flask
CMD ["python", "app.py"]
