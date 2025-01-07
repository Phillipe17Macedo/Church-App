/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, SafeAreaView } from "react-native";

import { styles } from "../../style/StylesMore/styles";
import OptionsMore from "@/components/OptionsScreenMore/OptionsMore";

export default function More() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack.Screen options={{ title: "Mais Opções" }} />

      <OptionsMore />
    </View>
  );
}
