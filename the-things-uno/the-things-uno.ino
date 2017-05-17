#include <TheThingsNetwork.h>
#include <CayenneLPP.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>

/* Device codes */
const char *appEui = "70B3D57EF0004D48";
const char *appKey = "88377863AA510388318107E1946B8929";

/* How many blinks */
int blinks = 50;
/* BlinkTime/2 in milliseconds*/
int blinkRate = 100;

CayenneLPP lpp(51);

/* Prepare accelerometer*/
Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);

#define loraSerial Serial1
#define debugSerial Serial

TheThingsNetwork ttn(loraSerial, debugSerial, TTN_FP_EU868);

void setup()
{
  
  loraSerial.begin(57600);
  debugSerial.begin(9600);
  
  /* Start accelerometer */
  accel.begin();
  accel.setRange(ADXL345_RANGE_16_G);

  /* The Things Network connection*/
  ttn.provision(appEui, appKey);
  ttn.join(appEui, appKey);
  ttn.showStatus();

  /* Execute the function when a message is recived */
  ttn.onMessage(message);
}

void loop()
{
  /* Get a new sensor event */ 
  delay(5000);
  sensors_event_t event; 
  accel.getEvent(&event);

  /* Print X, Y, Z from the accelerometer */
  Serial.print("X: "); Serial.print(event.acceleration.x); Serial.print("  ");
  Serial.print("Y: "); Serial.print(event.acceleration.y); Serial.print("  ");
  Serial.print("Z: "); Serial.print(event.acceleration.z); Serial.print("  ");Serial.println("m/s^2 ");

  /* Prepare data */
  lpp.reset();
  lpp.addAccelerometer(1, event.acceleration.x, event.acceleration.y, event.acceleration.z);
  
  /* Send data */
  ttn.sendBytes(lpp.getBuffer(), lpp.getSize());
}

/* Blinking function */
void message(const uint8_t *payload, size_t length, port_t port) {
  Serial.print("-- BLINKING MESSAGE RECIVED ---");

  if (length != 1) {
    return;
  }

  for (int i=0; i <= blinks; i++){
    digitalWrite(LED_BUILTIN, HIGH);
    delay(blinkRate);
    digitalWrite(LED_BUILTIN, LOW);
    delay(blinkRate);
   } 
    
}
