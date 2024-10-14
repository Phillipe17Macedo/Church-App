import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, SafeAreaView, View } from "react-native";

import { styles } from "../../style/StylesEventos/styles";
import { ComponentAgenda } from "@/components/Agenda/ComponentAgenda";

export default function Eventos() {
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar style="light" />
      <Stack.Screen options={{ title: "Eventos" }} />

      <View
        style={[
          { backgroundColor: "#3E4A59" },
          { alignItems: "center" },
          { marginTop: 25 },
          { marginBottom: 20 },
          { width: "100%" },
          { justifyContent: "center" },
          { alignSelf: "center" },
          { borderRadius: 10 },
        ]}
      >
        <Text
          style={[
            { fontSize: 21 },
            { paddingHorizontal: 2 },
            { paddingVertical: 3 },
            { color: "#fff" },
            { textAlign: "justify" },
          ]}
        >
          ESTA TELA SERÁ LANÇADA EM BREVE COM SUAS FUNCIONALIDADES
        </Text>
      </View>

      <ComponentAgenda />
    </SafeAreaView>
  );
}
