import asyncio
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from bando_grid_node_v25_0_0_LIVE_EVOLUTION import BandoGridNode, send_system_message

app = FastAPI(
    title="Victor Infinity Core",
    description="Backend server for the Victor Infinity AGI.",
    version="25.0.0",
)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """Main WebSocket endpoint for the AGI."""
    await websocket.accept()

    node = BandoGridNode(websocket)
    await node.initialize()

    try:
        while True:
            data = await websocket.receive_text()
            try:
                message = json.loads(data)
                msg_type = message.get("type")
                payload = message.get("payload", {})

                if msg_type == "chat":
                    prompt = payload.get("prompt")
                    if prompt:
                        await node.process_prompt(prompt)
                    else:
                        await send_system_message(websocket, "ERROR: Received chat message with no prompt.")

                elif msg_type == "system":
                    # Placeholder for handling system commands from client
                    command = payload.get("command")
                    await send_system_message(websocket, f"Received system command: {command} (not implemented).")

                elif msg_type == "synth":
                     # Placeholder for handling synth requests
                    prompt = payload.get("prompt")
                    await send_system_message(websocket, f"Received synth request for: '{prompt}' (not implemented).")

                else:
                    await send_system_message(websocket, f"ERROR: Unknown message type '{msg_type}'.")

            except json.JSONDecodeError:
                await send_system_message(websocket, "ERROR: Received invalid JSON.")
            except Exception as e:
                await send_system_message(websocket, f"ERROR: An unexpected error occurred: {e}")

    except WebSocketDisconnect:
        print(f"Client {websocket.client} disconnected.")
    except Exception as e:
        print(f"An unexpected error caused the connection to close: {e}")
        # Attempt to send a final error message if the socket is still openable
        if not websocket.client_state == 'DISCONNECTED':
             await websocket.close(code=1011, reason=f"Internal Server Error: {e}")


if __name__ == "__main__":
    import uvicorn
    print("Starting Victor Infinity Core server...")
    print("Listening on http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
