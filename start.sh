#!/bin/bash
set -e

BACKEND_DIR="./server"
FRONTEND_DIR="./client"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
die()  { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# Trap to kill background processes on exit/interrupt
cleanup() {
  warn "Shutting down..."
  [[ -n "$BACKEND_PID" ]]  && kill "$BACKEND_PID"  2>/dev/null
  [[ -n "$FRONTEND_PID" ]] && kill "$FRONTEND_PID" 2>/dev/null
  exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# Check required tools
for cmd in node npm npx; do
  command -v "$cmd" &>/dev/null || die "'$cmd' is not installed."
done

start_backend() {
  log "Installing backend dependencies..."
  (cd "$BACKEND_DIR" && npm ci --omit=dev) || die "Backend npm install failed."

  log "Starting backend server..."
  (cd "$BACKEND_DIR" && npm start) &
  BACKEND_PID=$!
  log "Backend running (PID: $BACKEND_PID)"
}

start_frontend() {
  log "Installing frontend dependencies..."
  (cd "$FRONTEND_DIR" && npm ci) || die "Frontend npm install failed."

  log "Building frontend..."
  (cd "$FRONTEND_DIR" && npm run build) || die "Frontend build failed."

  log "Serving frontend..."
  npx serve -s "$FRONTEND_DIR/dist" &
  FRONTEND_PID=$!
  log "Frontend running (PID: $FRONTEND_PID)"
}

# --- Docker mode ---
if [[ "$1" == "--docker" ]]; then
  log "Starting with Docker Compose..."
  command -v docker &>/dev/null || die "Docker is not installed."
  docker compose up --build
  exit 0
fi

# --- Local mode ---
start_backend
start_frontend

log "Both services are up. Press Ctrl+C to stop."
wait "$BACKEND_PID" "$FRONTEND_PID"
