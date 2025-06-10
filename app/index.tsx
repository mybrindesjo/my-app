import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  LoginScreen: undefined;
};

export default function LoginScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'LoginScreen'>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaFailed, setCaptchaFailed] = useState(true);
  const [randomSecurityQuestion, setRandomSecurityQuestion] = useState("");

  // Ologiska säkerhetsfrågor
  const securityQuestions = [
    "Vad åt du till frukost den 17:e mars 2014?",
    "Vad hette din barndoms låtsaskompis, men baklänges?",
    "Räkna ut summan av alla siffror i ditt personnummer.",
    "Vilken färg tänkte du på igår klockan 16:23?",
    "Om du vore ett djur, vad skulle din favoritmat vara?",
  ];

  // Slumpmässig **meningslös** säkerhetsfråga
  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * securityQuestions.length);
    setRandomSecurityQuestion(securityQuestions[randomIndex]);
  }, []);

  const handleLogin = async () => {
    setLoading(true);

    setTimeout(async () => {
      if (captchaFailed) {
        Alert.alert(
          "Captcha-fel!",
          "Rita en perfekt cirkel med musen och försök igen."
        );
        setCaptchaFailed(false); // Nästa gång får de en ny omöjlig uppgift
      } else {
        Alert.alert(
          "Säkerhetsfråga!",
          `Du måste svara korrekt på: "${randomSecurityQuestion}"`
        );
        setLoading(false);
      }
    }, Math.random() * 10000 + 5000); // Absurt långsam laddning
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Logga in (om du någonsin lyckas) 😈</Text>

      {/* Dåliga input-fält */}
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Ange din email, men jag sparar den ändå inte."
        style={{ borderBottomWidth: 1, marginBottom: 50 }}
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Minst 30 tecken, 6 emojis och en dikt."
        style={{ borderBottomWidth: 1 }}
        secureTextEntry
      />

      {/* Ologiska popup-fönster */}
      {captchaFailed && (
        <Text style={{ color: "red", marginBottom: 20 }}>
          ⚠ Beräkna roten ur din sko-storlek och avrunda till närmaste primtal.
        </Text>
      )}

      {/* Fake-loading och vilseledande knappar */}
      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <View>
          <Button title="Logga in (eller gör livet surt för dig själv)" onPress={handleLogin} />
          <Button title="Skapa konto (Men varför ens försöka?)" onPress={() => alert("Otur! 😏")} />
        </View>
      )}
    </View>
  );
}
