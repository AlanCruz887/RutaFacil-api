import time
import websocket
import json
import requests

# Configuración del servidor y archivo de ruta
SERVER_WS_URL = "ws://34.60.25.98:3000"  # Dirección del servidor WebSocket
COORDINATES_FILE = "/home/alancruz/RutaFacil-api/python/coordinates.json"  # Archivo JSON con las coordenadas

# URL del endpoint para obtener notificaciones por vehículo
GET_NOTIFICATIONS_URL = "http://34.60.25.98:3000/api/notifications/get-notification-by-vehicle"

# Función para enviar notificaciones push
def send_push_notification(token, title, body, data=None):
    url = "https://exp.host/--/api/v2/push/send"
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    payload = {
        "to": token,
        "title": title,
        "body": body,
        "sound": "default",  # Incluye sonido en la notificación
        "data": data or {},
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        print("Notificación enviada correctamente.")
    else:
        print(f"Error al enviar la notificación: {response.status_code}")
        print(response.json())

# Función para obtener notificaciones por vehicle_id
def get_notifications_by_vehicle(vehicle_id):
    url = f"{GET_NOTIFICATIONS_URL}/{vehicle_id}"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                print(f"Notificaciones obtenidas para el vehículo {vehicle_id}: {data['data']}")
                return data["data"]
            else:
                print(f"Error al obtener notificaciones: {data['message']}")
        else:
            print(f"Error HTTP al obtener notificaciones: {response.status_code}")
    except Exception as e:
        print(f"Error al hacer la solicitud GET: {e}")
    return []

# Cargar coordenadas desde el archivo JSON
def load_coordinates_from_json(file_path):
    try:
        with open(file_path, "r") as file:
            data = json.load(file)
            return [{"lat": item["lat"], "lng": item["lng"]} for item in data]
    except Exception as e:
        print(f"Error al cargar el archivo JSON: {e}")
        return []

# Manejar mensajes del servidor WebSocket
def on_message(ws, message):
    response = json.loads(message)
    if response.get("success"):
        print(f"Servidor: {response['message']}")
        if "data" in response:
            print(f"Datos actualizados: {response['data']}")
    else:
        print(f"Error del servidor: {response['message']}")

# Simulación de recorrido bidireccional
def simulate_bidirectional_route(ws, vehicle_id, coordinates, interval=0.5):
    direction = "outbound"

    while True:
        print(f"Iniciando simulación en dirección {direction}...")

        # Obtener notificaciones para el vehículo
        notifications = get_notifications_by_vehicle(vehicle_id)

        # Enviar notificaciones push a los tokens obtenidos
        for notification in notifications:
            send_push_notification(
                notification["push_token"],
                title="Actualización del Vehículo",
                body=f"El vehículo {vehicle_id} está en movimiento en dirección {direction}.",
                data={"direction": direction}
            )

        # Simular el recorrido
        for coord in coordinates:
            payload = {
                "vehicle_id": vehicle_id,
                "lat": coord["lat"],
                "lon": coord["lng"],
                "event_type": "significant_change",
                "direction": direction,
            }
            ws.send(json.dumps(payload))
            time.sleep(interval)

        # Enviar el fin del recorrido
        payload = {
            "vehicle_id": vehicle_id,
            "lat": coordinates[-1]["lat"],
            "lon": coordinates[-1]["lng"],
            "event_type": "end_route",
            "direction": direction,
        }
        ws.send(json.dumps(payload))
        print(f"Recorrido completado en dirección {direction}.")

        # Invertir las coordenadas y cambiar la dirección
        coordinates.reverse()
        direction = "inbound" if direction == "outbound" else "outbound"

# Ejecutar la simulación
if __name__ == "__main__":
    coordinates = load_coordinates_from_json(COORDINATES_FILE)
    if coordinates:
        ws = websocket.WebSocketApp(
            SERVER_WS_URL,
            on_message=on_message,
        )

        try:
            ws.on_open = lambda ws: simulate_bidirectional_route(ws, vehicle_id=1, coordinates=coordinates, interval=0.5)
            ws.run_forever()
        except KeyboardInterrupt:
            print("Simulación detenida por el usuario.")
