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

type CRUDOpcoesFormProps = {
  onSubmit: (opcaoData: {
    nomeOpcao: string;
    url: string;
    dataCadastro: string;
  }) => void;
  onClose: () => void;
  opcaoInicial?: {
    nomeOpcao: string;
    url: string;
    dataCadastro: string;
  } | null;
};

export default function CRUDOpcoesForm({
  onSubmit,
  onClose,
  opcaoInicial,
}: CRUDOpcoesFormProps) {
  const [nomeOpcao, setNomeOpcao] = useState(opcaoInicial?.nomeOpcao || "");
  const [url, setUrl] = useState(opcaoInicial?.url || "");
  const [dataCadastro, setDataCadastro] = useState(
    opcaoInicial?.dataCadastro || new Date().toISOString().split("T")[0]
  );

  const handleSalvarOpcao = () => {
    onSubmit({
      nomeOpcao,
      url,
      dataCadastro,
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
        placeholder="Nome da Opção"
        value={nomeOpcao}
        onChangeText={setNomeOpcao}
      />
      <TextInput
        style={styles.inputTextoEvento}
        placeholder="URL"
        value={url}
        onChangeText={setUrl}
      />
      <TextInput
        style={styles.inputTextoEvento}
        placeholder="Data de Cadastro"
        value={dataCadastro}
        editable={false} // Apenas para visualização
      />
      <TouchableOpacity onPress={handleSalvarOpcao}>
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
