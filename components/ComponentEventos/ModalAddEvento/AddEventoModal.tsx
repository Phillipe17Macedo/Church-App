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

import { Evento } from "@/types";

type AddEventoFormProps = {
  onSubmit: (
    eventoData: Partial<
      Pick<
        Evento,
        | "titulo"
        | "data"
        | "horario"
        | "endereco"
        | "linkEnderecoMaps"
        | "numeroContato"
        | "valor"
        | "descricao"
      >
    >
  ) => void;
  onClose: () => void;
  evento?: Partial<Evento>;
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

export default function AddEventoForm({
  onSubmit,
  onClose,
  evento,
}: AddEventoFormProps) {
  const [titulo, setTitulo] = useState(evento?.titulo || "");
  const [data, setData] = useState(evento?.data || "");
  const [horario, setHorario] = useState(evento?.horario || "");
  const [endereco, setEndereco] = useState(evento?.endereco || "");
  const [linkEnderecoMaps, setLinkEnderecoMaps] = useState(
    evento?.linkEnderecoMaps || ""
  );
  const [numeroContato, setNumeroContato] = useState(
    evento?.numeroContato || ""
  );
  const [valor, setValor] = useState(evento?.valor || "");
  const [descricao, setDescricao] = useState(evento?.descricao || "");

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
        placeholder="Data do Evento (dd/mm/yyyy)"
        value={data}
        onChangeText={(text) => setData(formatDate(text))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.inputTextoEvento}
        placeholder="Horário do Evento (00:00)"
        value={horario}
        onChangeText={(text) => setHorario(formatTime(text))}
        keyboardType="numeric"
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
        placeholder="Número de Contato (XX) XXXXX-XXXX"
        value={numeroContato}
        onChangeText={(text) => setNumeroContato(formatPhone(text))}
        keyboardType="phone-pad" // Mostra teclado numérico para telefones
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
