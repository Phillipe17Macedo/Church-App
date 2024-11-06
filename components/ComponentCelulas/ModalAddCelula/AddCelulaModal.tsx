import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "./styles"; // Substitua pelo caminho correto do seu arquivo de estilos

type AddCelulaFormProps = {
  onSubmit: (celulaData: {
    titulo: string;
    data: string;
    horario: string;
    endereco: string;
    linkEnderecoMaps: string;
    nomeLider: string;
    numeroLider: string;
    descricao: string;
  }) => void;
  onClose: () => void;
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
        placeholder="Dia da Célula"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        style={styles.inputTextoCelula}
        placeholder="Horário da Célula"
        value={horario}
        onChangeText={setHorario}
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
        placeholder="Número do Líder"
        value={numeroLider}
        onChangeText={setNumeroLider}
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
