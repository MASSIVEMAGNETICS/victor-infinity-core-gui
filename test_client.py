import asyncio
import json
import websockets

async def run_test():
    uri = "ws://localhost:8000/ws"
    try:
        async with websockets.connect(uri) as websocket:
            print("--- Test Case 1: Initial Connection ---")
            # The server should send a few system messages upon connection
            for _ in range(4): # Welcome messages
                message = await asyncio.wait_for(websocket.recv(), timeout=5.0)
                print(f"< Received: {message}")
                data = json.loads(message)
                assert data['type'] == 'system'
            print("--- Test Case 1: PASSED ---")

            print("\n--- Test Case 2: Standard Chat Prompt ---")
            chat_payload = {
                "type": "chat",
                "payload": {"prompt": "Hello, this is a test."}
            }
            await websocket.send(json.dumps(chat_payload))
            print(f"> Sent: {json.dumps(chat_payload)}")

            # First response is a system message acknowledging the prompt
            response1 = await asyncio.wait_for(websocket.recv(), timeout=5.0)
            print(f"< Received: {response1}")
            data1 = json.loads(response1)
            assert data1['type'] == 'system'

            # Second response is another system message about processing
            response2 = await asyncio.wait_for(websocket.recv(), timeout=5.0)
            print(f"< Received: {response2}")
            data2 = json.loads(response2)
            assert data2['type'] == 'system'

            # Third response is the actual chat reply
            response3 = await asyncio.wait_for(websocket.recv(), timeout=5.0)
            print(f"< Received: {response3}")
            data3 = json.loads(response3)
            assert data3['type'] == 'chat'
            assert "Acknowledged" in data3['payload']['text']
            print("--- Test Case 2: PASSED ---")


            print("\n--- Test Case 3: Evolution Prompt ---")
            evolve_payload = {
                "type": "chat",
                "payload": {"prompt": "Your cognitive parallelism is insufficient. Evolve."}
            }
            await websocket.send(json.dumps(evolve_payload))
            print(f"> Sent: {json.dumps(evolve_payload)}")

            # The server will send a whole stream of system messages during evolution
            # We'll just consume them until we get the final chat message
            final_chat_message_received = False
            for i in range(20): # generously wait for many messages
                message = await asyncio.wait_for(websocket.recv(), timeout=15.0)
                print(f"< Received: {message}")
                data = json.loads(message)
                if data.get('type') == 'chat' and 'Evolution successful' in data.get('payload', {}).get('text', ''):
                    final_chat_message_received = True
                    print("--- Evolution successful message received! ---")
                    break

            assert final_chat_message_received, "Did not receive final evolution success message"
            print("--- Test Case 3: PASSED ---")


    except Exception as e:
        print(f"An error occurred: {e}")
        return False

    return True

if __name__ == "__main__":
    print("Starting WebSocket test client...")
    test_passed = asyncio.run(run_test())
    if test_passed:
        print("\n✅ All tests passed!")
    else:
        print("\n❌ Some tests failed.")
        # Exit with a non-zero code to indicate failure
        exit(1)
