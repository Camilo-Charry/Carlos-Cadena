import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

export default function App() {
  const [input, setInput] = useState('');

  const handlePress = (value) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '⌫') {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === '=') {
      try {
        let result = eval(input.replace('%', '/100'));
        setInput(result.toString());
      } catch (error) {
        setInput('Error');
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    ['C', '⌫', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <ImageBackground
      source={{ uri: 'https://pbs.twimg.com/media/GPrpWkpW8AAMHE_.jpg:large' }} // Imagen donde Cristiano Ronaldo es claramente visible
      style={styles.background}
      blurRadius={2} // Menos borroso para que se vea más Ronaldo
    >
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <View style={styles.display}>
            <ScrollView horizontal contentContainerStyle={styles.scrollView}>
              <Text style={styles.displayText}>{input || '0'}</Text>
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
            {buttons.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((button) => (
                  <TouchableOpacity
                    key={button}
                    style={[
                      styles.button,
                      button === '=' && styles.equalButton,
                      button === 'C' && styles.clearButton,
                      button === '⌫' && styles.deleteButton,
                      ['/','*','-','+','%'].includes(button) && styles.operatorButton,
                      button === '0' && styles.zeroButton,
                    ]}
                    onPress={() => handlePress(button)}
                  >
                    <Text style={styles.buttonText}>{button}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.63)', // Menos opaco para ver mejor la imagen
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  display: {
    backgroundColor: 'rgba(30,30,30,0.7)',
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  displayText: {
    fontSize: 48,
    color: '#FFFFFF',
    textAlign: 'right',
  },
  buttonContainer: {
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'rgba(45,45,45,0.8)',
    paddingVertical: 22,
    borderRadius: 20,
    width: width / 5 - 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  equalButton: {
    backgroundColor: '#26A69A',
  },
  clearButton: {
    backgroundColor: '#EF5350',
  },
  deleteButton: {
    backgroundColor: '#FFB74D',
  },
  operatorButton: {
    backgroundColor: '#42A5F5',
  },
  zeroButton: {
    flex: 1,
    width: undefined,
  },
});
