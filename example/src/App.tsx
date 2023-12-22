import * as React from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  utf8ToString,
  stringToUtf8,
  installModule,
} from 'react-native-quick-utf8';

installModule();

const initialText = 'Hello, world!';

export default function App() {
  const [decodedText, setDecodedText] = React.useState(initialText);
  const [encodedText, setEncodedText] = React.useState(
    stringToUtf8(initialText)
  );

  const onDecodedTextChange = (newDecodedText: string) => {
    console.log('decodedText', newDecodedText);
    setDecodedText(newDecodedText);
    setEncodedText(stringToUtf8(newDecodedText));
  };

  const onEncodedTextChange = (newEncodedText: string) => {
    console.log('encodedText', newEncodedText);
    const encodedTextBytes = new Uint8Array(
      newEncodedText.split(',').map(Number)
    );
    setEncodedText(encodedTextBytes);
    setDecodedText(utf8ToString(encodedTextBytes));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.headline}>
            Convert string to UTF-8 encoded bytes and back:
          </Text>
          <Text style={styles.inputLabel}>String:</Text>
          <TextInput
            onChangeText={onDecodedTextChange}
            value={decodedText}
            style={styles.input}
            keyboardType="default"
            autoFocus={true}
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
          />
          <Text style={styles.inputLabel}>Bytes:</Text>
          <TextInput
            onChangeText={onEncodedTextChange}
            value={encodedText.join(', ')}
            style={styles.input}
            keyboardType="numeric"
            autoCorrect={false}
            multiline={true}
          />
          <Text style={styles.inputLabel}>Example test cases:</Text>
          <View style={styles.tableRow}>
            <Text>String:</Text>
            <Text>Expected encoding:</Text>
            <Text>Actual result:</Text>
            <Text>Done:</Text>
          </View>
          <View style={styles.tableRow}>
            <Text>Hello, world!</Text>
            <Text>
              72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33
            </Text>
            <Text>
              72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33
            </Text>
            <Text>✅</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#eeeeee',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  input: {
    height: 100,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  headline: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingBottom: 20,
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
  },
});
