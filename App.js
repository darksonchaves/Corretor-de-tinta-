import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [permission, setPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [resultado, setResultado] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  const analisarCorFake = async () => {
    // versão estável (funciona em build)
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    setResultado({
      L: r,
      a: g,
      b: b,
    });
  };

  if (permission === null) {
    return (
      <View style={styles.center}>
        <Text>Solicitando permissão da câmera...</Text>
      </View>
    );
  }

  if (permission === false) {
    return (
      <View style={styles.center}>
        <Text>Sem permissão de câmera</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={StyleSheet.absoluteFill}
        ref={cameraRef}
        onCameraReady={() => setCameraReady(true)}
        ratio="16:9"
      />

      <View style={styles.overlay}>
        <Text style={styles.target}>+</Text>

        <Button
          title="Analisar Cor"
          onPress={analisarCorFake}
          disabled={!cameraReady}
        />

        {resultado && (
          <View style={styles.box}>
            <Text>L: {resultado.L}</Text>
            <Text>a: {resultado.a}</Text>
            <Text>b: {resultado.b}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  target: {
    fontSize: 40,
    color: 'red',
    marginBottom: 10,
  },
  box: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
