import React from "react";
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "./styles";

type ModalEventosProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  tituloEvento: string;
  setTituloEvento: (value: string) => void;
  dataDoEvento: string;
  setDataDoEvento: (value: string) => void;
  horarioDoEvento: string;
  setHorarioDoEvento: (value: string) => void;
  enderecoDoEvento: string;
  setEnderecoDoEvento: (value: string) => void;
  linkEnderecoMaps: string;
  setLinkEnderecoMaps: (value: string) => void;
  numeroContato: string;
  setNumeroContato: (value: string) => void;
  valor: string;
  setValor: (value: string) => void;
  descricao: string;
  setDescricao: (value: string) => void;
};

export function ModalEventos({
  visible,
  onClose,
  onSubmit,
  tituloEvento,
  setTituloEvento,
  dataDoEvento,
  setDataDoEvento,
  horarioDoEvento,
  setHorarioDoEvento,
  enderecoDoEvento,
  setEnderecoDoEvento,
  linkEnderecoMaps,
  setLinkEnderecoMaps,
  numeroContato,
  setNumeroContato,
  valor,
  setValor,
  descricao,
  setDescricao,
}: ModalEventosProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.modalView}>
          <TextInput
            style={[styles.inputTextoEvento]}
            keyboardType="default"
            placeholder="Nome do Evento"
            value={tituloEvento}
            onChangeText={setTituloEvento}
          />
          <TextInput
            style={[styles.inputTextoEvento]}
            keyboardType="default"
            placeholder="Data do Evento"
            value={dataDoEvento}
            onChangeText={setDataDoEvento}
          />
          <TextInput
            style={[styles.inputTextoEvento]}
            keyboardType="default"
            placeholder="Horário do Evento"
            value={horarioDoEvento}
            onChangeText={setHorarioDoEvento}
          />
          <TextInput
            style={[styles.inputTextoEvento]}
            keyboardType="default"
            placeholder="Endereço do Evento"
            value={enderecoDoEvento}
            onChangeText={setEnderecoDoEvento}
          />
          <TextInput
            style={[styles.inputTextoEvento]}
            keyboardType="default"
            placeholder="Link do Endereço do Evento"
            value={linkEnderecoMaps}
            onChangeText={setLinkEnderecoMaps}
          />
          <TextInput
            style={[styles.inputTextoEvento]}
            keyboardType="default"
            placeholder="Número de Contato"
            value={numeroContato}
            onChangeText={setNumeroContato}
          />
          <TextInput
            style={[styles.inputTextoEvento]}
            keyboardType="default"
            placeholder="Valor do Evento"
            value={valor}
            onChangeText={setValor}
          />
          <TextInput
            style={[styles.inputTextoEvento]}
            keyboardType="default"
            placeholder="Descrição do Evento"
            value={descricao}
            onChangeText={setDescricao}
          />
          <TouchableOpacity onPress={onSubmit}>
            <View style={[styles.saveButton]}>
              <Text style={[styles.saveText]}>Salvar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <View style={[styles.cancelButton]}>
              <Text style={[styles.cancelText]}>Cancelar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
