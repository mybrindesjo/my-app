import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
};

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("Onboarding");
    } catch (error) {
      alert("Registreringen misslyckades. Lösenordet måste vara minst 6 tecken långt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Skapa konto</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="E-postadress"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Lösenord (minst 6 tecken)"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        secureTextEntry
      />
      <Button title="Skapa konto" onPress={handleRegister} />
      <Button 
        title="Har du redan ett konto? Logga in" 
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}
