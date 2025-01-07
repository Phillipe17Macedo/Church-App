import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "./styles";
import { Celula } from "@/types";

type AddCelulaFormProps = {
  onSubmit: (celulaData: Omit<Celula, "id" | "imagem">) => void;
  onClose: () => void;
  celula?: Partial<Celula>;
};

// Função para formatar o campo de data
const formatDate = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/(\d{2})(\d)/, "$1/$2") // Adiciona barra após o dia
    .replace(/(\d{2})(\d)/, "$1/$2") // Adiciona barra após o mês
    .slice(0, 10); // Limita ao formato dd/mm/yyyy
};

// Função para formatar o campo de horário
const formatTime = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/(\d{2})(\d)/, "$1:$2") // Adiciona dois pontos após a hora
    .slice(0, 5); // Limita ao formato hh:mm
};

// Função para formatar o campo de telefone
const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/(\d{2})(\d)/, "($1) $2") // Adiciona parênteses no DDD
    .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona o traço no número
    .slice(0, 15); // Limita ao formato (XX) XXXXX-XXXX
};

export default function AddCelulaForm({
  onSubmit,
  onClose,
}: AddCelulaFormProps) {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [endereco, setEndereco] = useState("");
  const [linkEnderecoMaps, setLinkEnderecoMaps] = useState("");
  const [nomeLider, setNomeLider] = useState("");
  const [numeroLider, setNumeroLider] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleAddCelula = () => {
    onSubmit({
      titulo,
      data,
      horario,
      endereco,
      linkEnderecoMaps,
      nomeLider,
      numeroLider,
      descricao,
    });
    onClose();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.modalContainer}
    >
      <TextInput
        style={styles.inputTextoCelula}
        placeholder="Nome da Célula"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.inputTextoCelula}
        placeholder="Dia da Célula (dd/mm/yyyy)"
        value={data}
        onChangeText={(text) => setData(formatDate(text))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.inputTextoCelula}
        placeholder="Horário da Célula (00:00)"
        value={horario}
        onChangeText={(text) => setHorario(formatTime(text))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.inputTextoCelula}
        placeholder="Endereço da Célula"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.inputTextoCelula}
        placeholder="Link do Endereço Maps"
        value={linkEnderecoMaps}
        onChangeText={setLinkEnderecoMaps}
      />
      <TextInput
        style={styles.inputTextoCelula}
        placeholder="Nome do Líder"
        value={nomeLider}
        onChangeText={setNomeLider}
      />
      <TextInput
        style={styles.inputTextoCelula}
        placeholder="Número do Líder (XX) XXXXX-XXXX"
        value={numeroLider}
        onChangeText={(text) => setNumeroLider(formatPhone(text))}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.inputTextoCelula}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity onPress={handleAddCelula}>
        <View style={styles.confirmButton}>
          <Text style={styles.textButton}>Salvar</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose}>
        <View style={styles.cancelButton}>
          <Text style={styles.textButton}>Cancelar</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
