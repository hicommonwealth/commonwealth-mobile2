import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Button
} from 'react-native';

type Props = {
  onComplete: (code: string) => void;
  onCancel?: () => void;
  headerText: string;
};

export const CodeDialog = ({ onComplete, onCancel, headerText }: Props) => {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const inputs = useRef<Array<TextInput | null>>([]);

  const focusInput = (idx: number) => {
    inputs.current[idx]?.focus();
  };

  const handleChange = (idx: number) => (text: string) => {
    const value = text.replace(/\D/g, '').slice(-1);
    const nextDigits = [...digits];
    nextDigits[idx] = value;
    setDigits(nextDigits);

    if (value && idx < 5) focusInput(idx + 1);
    if (nextDigits.every((d) => d !== '')) onComplete(nextDigits.join(''));
  };

  const handleKeyPress = (idx: number) => (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[idx] && idx > 0) {
      const nextDigits = [...digits];
      nextDigits[idx - 1] = '';
      setDigits(nextDigits);
      focusInput(idx - 1);
    }
  };

  const handlePaste = async () => {
    // const clipboard = await Clipboard.getString();
    // const text = clipboard.replace(/\D/g, '').slice(0, 6);
    // if (text.length === 6) {
    //   const nextDigits = text.split('');
    //   setDigits(nextDigits);
    //   focusInput(5);
    //   onComplete(text);
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>
          {headerText}
        </Text>

        <Text style={styles.subtitle}>
          then enter the code we sent you to verify your identity
        </Text>

        <View style={styles.codeRow}>
          {digits.map((d, idx) => (
            <TextInput
              key={idx}
              ref={(el) => (inputs.current[idx] = el)}
              value={d}
              onChangeText={handleChange(idx)}
              onKeyPress={handleKeyPress(idx)}
              onFocus={idx === 0 ? handlePaste : undefined}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.input}
              autoFocus={idx === 0}
              blurOnSubmit={false}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onCancel} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
    fontSize: 32,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  input: {
    width: 48,
    height: 48,
    fontSize: 24,
    textAlign: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
