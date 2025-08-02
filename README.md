# Victor Infinity Core

This project contains the frontend GUI and the Python backend for the Victor Infinity AGI.

Victor Infinity is a simulated Autonomous Self-Evolving AGI Node. This application provides a web interface to interact with the node, issue commands, and trigger its evolution cycle.

## Architecture

*   **Backend**: A Python server using FastAPI that runs the AGI simulation (`BandoGridNode`). It communicates with the frontend over WebSockets.
*   **Frontend**: A React-based web application built with Vite that provides the user interface for interacting with the AGI.

## Running the Application

To run the full application, you need to run both the backend server and the frontend client.

### 1. Run the Backend Server

The backend server is responsible for running the AGI simulation.

**Prerequisites:** Python 3.7+

1.  **Set up a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

2.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the server:**
    ```bash
    python server.py
    ```
    The server will start on `http://localhost:8000`.

### 2. Run the Frontend Client

The frontend provides the web interface in `victor-infinity-core/`.

**Prerequisites:** Node.js

1.  **Navigate to the frontend directory:**
    ```bash
    cd victor-infinity-core
    ```

2.  **Install NPM dependencies:**
    ```bash
    npm install
    ```

3.  **Run the client:**
    ```bash
    npm run dev
    ```
    The frontend development server will start, usually on `http://localhost:5173`.

### 3. Access the Application

Once both the backend and frontend are running, open your web browser and navigate to the address provided by the frontend development server (e.g., `http://localhost:5173`). The application will open and automatically connect to the backend WebSocket server.
