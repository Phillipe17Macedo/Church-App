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

type AddEventoFormProps = {
  onSubmit: (eventoData: {
    titulo: string;
    data: string;
    horario: string;
    endereco: string;
    linkEnderecoMaps: string;
    numeroContato: string;
    valor: string;
    descricao: string;
  }) => void;
  onClose: () => void;
};

export default function AddEventoForm({
  onSubmit,
  onClose,
}: AddEventoFormProps) {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [endereco, setEndereco] = useState("");
  const [linkEnderecoMaps, setLinkEnderecoMaps] = useState("");
  const [numeroContato, setNumeroContato] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleAddEvento = () => {
    onSubmit({
      titulo,
      data,
      horario,
      endereco,
      linkEnderecoMaps,
      numeroContato,
      valor,
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
        style={styles.inputTextoEvento}
        placeholder="Nome do Evento"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.inputTextoEvento}
        placeholder="Data do Evento"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        style={styles.inputTextoEvento}
        placeholder="Horário do Evento"
        value={horario}
        onChangeText={setHorario}
      />
      <TextInput
        style={styles.inputTextoEvento}
        placeholder="Endereço do Evento"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.inputTextoEvento}
        placeholder="Link do Endereço"
        value={linkEnderecoMaps}
        onChangeText={setLinkEnderecoMaps}
      />
      <TextInput
        style={styles.inputTextoEvento}
        placeholder="Número de Contato"
        value={numeroContato}
        onChangeText={setNumeroContato}
      />
      <TextInput
        style={styles.inputTextoEvento}
        placeholder="Valor do Evento"
        value={valor}
        onChangeText={setValor}
      />
      <TextInput
        style={styles.inputTextoEvento}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity onPress={handleAddEvento}>
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
