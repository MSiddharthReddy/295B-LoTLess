#include <SoftwareSerial.h>
#include <math.h>
#include "HX711.h"

SoftwareSerial mySerial(10, 11);
HX711 scale(A1, A0);    // parameter "gain" is ommited; the default value 128 is used by the library
float currentWeight = 0;
float temp = 0;
void setup() {
  mySerial.begin(38400);
  Serial.begin(9600);
  Serial.println("HX711 Demo");
  scale.set_scale(250.0f);//caliberation value obtained from comparing known weights.
  scale.tare();
  mySerial.print(abs(round(currentWeight)));
  mySerial.print("\n");
  currentWeight = scale.get_units(10);
 
}

void loop() {   
   
  float temp = scale.get_units(10);
  
  if( (abs(temp) != abs(currentWeight)) ) {
        
    currentWeight = temp;
    Serial.println("Changed weight");
    Serial.println(currentWeight);
    mySerial.print(abs(round(currentWeight)));
    mySerial.print("\n");
    
  } 
  else {
    Serial.println("weight unchanged");
    Serial.println(temp);
  }
  
  delay(100);
}
