import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  Modal,
  ScrollView,
  RefreshControl,
  TextInput,
} from "react-native";
import { styles } from "./styles";

// Funções CRUD Firebase
import {
  criarOpcao,
  buscarOpcoes,
  atualizarOpcao,
  deletarOpcao,
} from "@/connection/Opcoes/opcoes";
import { isAdmin } from "@/connection/Usuario/authAdmin";

// Modais
import ModalPixPayment from "./ModalPixPayment";
import CRUDOpcoesForm from "./Modal";
// import ModalConfirmacaoRemocao from "./ModalRemocao/ModalConfirmacaoRemocao";

// Types
import { Opcao } from "@/types";

export default function OptionsMore() {
  const [pixModalVisible, setPixModalVisible] = useState(false);
  const [editPixModalVisible, setEditPixModalVisible] = useState(false);
  const [crudModalVisible, setCrudModalVisible] = useState(false);
  const [opcoes, setOpcoes] = useState<Opcao[]>([]);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<Opcao | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pixCode, setPixCode] = useState(
    "00020126580014BR.GOV.BCB.PIX01366b2da3e8-64b7-497c-a7c7-2bc1a6cc06715204000053039865802BR5924Phillipe Ferreira Macedo6009SAO PAULO62140510OUeswRH4Ii63043367"
  );
  const [newPixCode, setNewPixCode] = useState(pixCode);

  // Função para carregar as opções do Firebase
  const carregarOpcoes = async () => {
    try {
      const opcoesBuscadas = await buscarOpcoes();
      setOpcoes(opcoesBuscadas);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as opções.");
    }
  };

  // Verifica se o usuário é admin
  const verificarAdmin = async () => {
    const adminStatus = await isAdmin();
    setIsAdminUser(adminStatus);
  };

  useEffect(() => {
    verificarAdmin();
    carregarOpcoes();
  }, []);

  const openPixModal = () => setPixModalVisible(true);
  const closePixModal = () => setPixModalVisible(false);

  const openEditPixModal = () => {
    setNewPixCode(pixCode);
    setEditPixModalVisible(true);
  };
  const closeEditPixModal = () => setEditPixModalVisible(false);

  const handleSavePixCode = () => {
    if (!newPixCode.trim()) {
      Alert.alert("Erro", "O código Pix não pode estar vazio.");
      return;
    }
    setPixCode(newPixCode);
    closeEditPixModal();
    Alert.alert("Sucesso", "Código Pix atualizado com sucesso!");
  };

  const openCrudModal = (opcao: Opcao | null = null) => {
    setOpcaoSelecionada(opcao);
    setCrudModalVisible(true);
  };

  const closeCrudModal = () => {
    setOpcaoSelecionada(null);
    setCrudModalVisible(false);
  };

  const updatePixCode = () => {
    if (!isAdminUser) {
      Alert.alert(
        "Permissão Negada",
        "Apenas administradores podem editar o Pix."
      );
      return;
    }
    Alert.prompt(
      "Editar Código Pix",
      "Insira o novo código Pix para atualizar:",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salvar",
          onPress: (newCode) => {
            if (newCode) {
              setPixCode(newCode);
              Alert.alert("Sucesso", "Código Pix atualizado com sucesso!");
            } else {
              Alert.alert("Erro", "O código Pix não pode estar vazio.");
            }
          },
        },
      ],
      "plain-text",
      pixCode
    );
  };

  const handleSubmitOpcao = async (opcaoData: Omit<Opcao, "id">) => {
    try {
      if (opcaoSelecionada) {
        await atualizarOpcao(opcaoSelecionada.id ?? "", opcaoData);
        Alert.alert("Sucesso", "Opção atualizada com sucesso.");
      } else {
        await criarOpcao(opcaoData);
        Alert.alert("Sucesso", "Opção criada com sucesso.");
      }
      carregarOpcoes();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a opção.");
    } finally {
      closeCrudModal();
    }
  };

  const handleDeleteOpcao = async (id: string) => {
    try {
      await deletarOpcao(id);
      Alert.alert("Sucesso", "Opção deletada com sucesso.");
      carregarOpcoes();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar a opção.");
    }
  };

  const handleOptionRedirect = (url: string) => {
    if (!url) {
      Alert.alert("Erro", "Essa opção não possui um link válido.");
      return;
    }
    Linking.openURL(url).catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o link.");
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarOpcoes();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TouchableOpacity style={styles.button} onPress={openPixModal}>
        <Text style={styles.buttonText}>Dízimos & Ofertas</Text>
      </TouchableOpacity>

      {isAdminUser && (
        <TouchableOpacity style={[styles.buttonAdd]} onPress={openEditPixModal}>
          <Text style={[styles.buttonText, { color: "#3E3D3D" }]}>
            Editar Código Pix
          </Text>
        </TouchableOpacity>
      )}

      {opcoes.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.optionItem}
          onPress={() => handleOptionRedirect(item.url)}
        >
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>{item.nomeOpcao}</Text>
          </View>
          {isAdminUser && (
            <View style={styles.optionActions}>
              <TouchableOpacity onPress={() => openCrudModal(item)}>
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Confirmar Remoção",
                    "Deseja remover esta opção?",
                    [
                      { text: "Cancelar", style: "cancel" },
                      {
                        text: "Remover",
                        onPress: () => handleDeleteOpcao(item.id ?? ""),
                        style: "destructive",
                      },
                    ]
                  )
                }
              >
                <Text style={styles.actionText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      ))}

      {isAdminUser && (
        <TouchableOpacity
          style={[styles.buttonAdd]}
          onPress={() => openCrudModal()}
        >
          <Text style={[styles.buttonText, { color: "#3E3D3D" }]}>
            Adicionar Opção
          </Text>
        </TouchableOpacity>
      )}

      {/* Modal CRUD */}
      <Modal visible={crudModalVisible} animationType="slide" transparent>
        <CRUDOpcoesForm
          onSubmit={handleSubmitOpcao}
          onClose={closeCrudModal}
          opcaoInicial={opcaoSelecionada}
        />
      </Modal>

      {/* Modal Pix */}
      <ModalPixPayment
        visible={pixModalVisible}
        onClose={closePixModal}
        pixCode={pixCode}
      />

      <Modal
        visible={editPixModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeEditPixModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#3E4A59",
              padding: 20,
              width: "90%",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
                color: "white",
                alignSelf: "center",
              }}
            >
              Editar Código Pix
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
                marginBottom: 10,
                paddingHorizontal: 10,
                color: "#000",
                backgroundColor: "#F2F2F2",
              }}
              value={newPixCode}
              onChangeText={setNewPixCode}
              placeholder="Insira o novo código Pix"
            />
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "#3071F2",
                borderRadius: 5,
              }}
              onPress={handleSavePixCode}
            >
              <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
                Salvar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#F22738",
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={closeEditPixModal}
            >
              <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
