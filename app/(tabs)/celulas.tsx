import { launchImageLibraryAsync } from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  RefreshControl,
  Modal,
} from "react-native";
import { styles } from "../../style/StylesCelulas/styles";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { isAdmin } from "@/connection/Usuario/authAdmin";
import { buscarCelulaDoBanco } from "@/connection/Celula/buscar";
import { salvarCelulaNoBanco } from "@/connection/Celula/salvar";
import { removerCelulaDoBanco } from "@/connection/Celula/remover";

import InfoCelulaModal from "@/components/ComponentCelulas/ModalInformacoesCelula/InfoCelulaModal";
import ComponentCelulas from "@/components/ComponentCelulas/ComponentCelulas";
import AddCelulaForm from "@/components/ComponentCelulas/ModalAddCelula/AddCelulaModal";
import ModalConfirmacaoRemocaoCelula from "@/components/ComponentCelulas/ModalRemocao/ModalConfirmacaoRemocaoCelula";
import { Celula } from "@/types";

export default function Celulas() {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [celulaItems, setCelulaItems] = useState<Celula[]>([]);
  const [confirmacaoVisivel, setConfirmacaoVisivel] = useState(false);
  const [celulaIndexToRemove, setCelulaIndexToRemove] = useState<number | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);
  const [addCelulaModalVisible, setAddCelulaModalVisible] = useState(false);
  const [selectedCelula, setSelectedCelula] = useState<Celula | null>(null);

  useEffect(() => {
    const initializeAdminStatus = async () => setIsAdminUser(await isAdmin());
    const fetchCelulas = async () =>
      setCelulaItems(await buscarCelulaDoBanco());
    initializeAdminStatus();
    fetchCelulas();
  }, []);

  const handleAddCelula = async (celulaData: Omit<Celula, "id" | "imagem">) => {
    try {
      const result = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 2],
        quality: 1,
      });
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
        const storageReference = storageRef(
          getStorage(),
          `celulas/${imageName}`
        );
        const imageBlob = await fetch(imageUri).then((response) =>
          response.blob()
        );

        await uploadBytes(storageReference, imageBlob);
        const downloadURL = await getDownloadURL(storageReference);

        const celulaId = await salvarCelulaNoBanco({
          ...celulaData,
          imagem: downloadURL,
        });

        setCelulaItems([
          ...celulaItems,
          { id: celulaId ?? "", ...celulaData, imagem: downloadURL },
        ]);
        setAddCelulaModalVisible(false);
      }
    } catch (error) {
      console.error("Erro ao adicionar célula:", error);
    }
  };

  const exibirConfirmacao = (index: number) => {
    setCelulaIndexToRemove(index);
    setConfirmacaoVisivel(true);
  };

  const confirmarRemocao = async () => {
    if (celulaIndexToRemove === null) return;
    const celulaToRemove = celulaItems[celulaIndexToRemove];
    try {
      await removerCelulaDoBanco(celulaToRemove.id);
      setCelulaItems(celulaItems.filter((_, i) => i !== celulaIndexToRemove));
    } catch (error) {
      console.error("Erro ao remover célula:", error);
    } finally {
      setConfirmacaoVisivel(false);
      setCelulaIndexToRemove(null);
    }
  };

  const cancelarRemocao = () => {
    setConfirmacaoVisivel(false);
    setCelulaIndexToRemove(null);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      setCelulaItems(await buscarCelulaDoBanco());
    } catch (error) {
      console.error("Erro ao buscar células:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleCelulaPress = (celula: Celula) => {
    setSelectedCelula(celula);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.areaCelulas}>
          {celulaItems.map((item, index) => (
            <View key={item.id} style={styles.areaContainerCelula}>
              <TouchableOpacity onPress={() => handleCelulaPress(item)}>
                <ComponentCelulas
                  nomeCelula={item.titulo}
                  dataCelula={item.data}
                  horarioCelula={item.horario}
                  enderecoCelula={item.endereco}
                  imageUri={item.imagem}
                  onPress={() => handleCelulaPress(item)}
                />
              </TouchableOpacity>
              {isAdminUser && (
                <TouchableOpacity
                  style={styles.removerCelulaButton}
                  onPress={() => exibirConfirmacao(index)}
                >
                  <Text style={styles.removerCelulaButtonText}>Remover</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          {isAdminUser && (
            <TouchableOpacity onPress={() => setAddCelulaModalVisible(true)}>
              <View style={styles.containerIconeAddCelula}>
                <Text style={styles.iconeAddCelula}>+</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={addCelulaModalVisible}
        animationType="slide"
        transparent={true}
      >
        <AddCelulaForm
          onSubmit={handleAddCelula}
          onClose={() => setAddCelulaModalVisible(false)}
        />
      </Modal>

      <ModalConfirmacaoRemocaoCelula
        visivel={confirmacaoVisivel}
        onConfirmar={confirmarRemocao}
        onCancelar={cancelarRemocao}
      />

      <InfoCelulaModal
        visible={Boolean(selectedCelula)}
        celula={selectedCelula}
        onClose={() => setSelectedCelula(null)}
      />
    </SafeAreaView>
  );
}
