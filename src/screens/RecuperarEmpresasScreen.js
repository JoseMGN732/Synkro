import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeft, RotateCcw, Trash2 } from 'lucide-react-native';

export default function RecuperarEmpresasScreen({ navigation, onRestaurar }) {
  const [eliminadas, setEliminadas] = useState([]);

  useEffect(() => {
    cargarEliminadas();
  }, []);

  const cargarEliminadas = async () => {
    try {
      const guardado = await AsyncStorage.getItem('@lista_empresas_eliminadas');
      if (guardado) setEliminadas(JSON.parse(guardado));
    } catch (e) {
      console.error(e);
    }
  };

  const restaurarEmpresa = async (empresa) => {
    Alert.alert(
      "Restaurar",
      `¿Deseas recuperar a ${empresa.nombre}?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí, Restaurar",
          onPress: async () => {
            const nuevaEliminadas = eliminadas.filter(e => e.id !== empresa.id);
            setEliminadas(nuevaEliminadas);
            await AsyncStorage.setItem('@lista_empresas_eliminadas', JSON.stringify(nuevaEliminadas));

            if (onRestaurar) onRestaurar(empresa);
          }
        }
      ]
    );
  };

  const vaciarPapelera = async () => {
    Alert.alert(
      "Vaciar Papelera",
      "¿Estás seguro de eliminar permanentemente todas las empresas?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar Todo",
          style: "destructive",
          onPress: async () => {
            setEliminadas([]);
            await AsyncStorage.removeItem('@lista_empresas_eliminadas');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="px-6 py-4 flex-row items-center bg-white border-b border-gray-100">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 mr-4"
        >
          <ArrowLeft color="#4169e1" size={20} />
        </TouchableOpacity>
        <Text className="flex-1 text-2xl font-black text-[#1E293B]">Papelera</Text>
        {eliminadas.length > 0 && (
          <TouchableOpacity onPress={vaciarPapelera} className="bg-red-50 p-2.5 rounded-2xl border border-red-100">
            <Trash2 color="#EF4444" size={20} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView className="p-6">
        {eliminadas.length === 0 ? (
          <View className="items-center justify-center mt-20">
            <RotateCcw color="#CBD5E1" size={60} />
            <Text className="text-gray-400 mt-4 text-center">No hay empresas para recuperar</Text>
          </View>
        ) : (
          eliminadas.map((emp) => (
            <View key={emp.id} className="bg-white p-4 rounded-2xl mb-4 border border-gray-100 flex-row items-center shadow-sm">
              <Image source={{ uri: emp.logo }} className="w-12 h-12 rounded-xl mr-4 bg-gray-100" />
              <View className="flex-1">
                <Text className="font-bold text-gray-900">{emp.nombre}</Text>
                <Text className="text-xs text-gray-500">{emp.categoria}</Text>
              </View>
              <TouchableOpacity
                onPress={() => restaurarEmpresa(emp)}
                className="bg-green-50 p-3 rounded-xl border border-green-100"
              >
                <RotateCcw color="#10B981" size={20} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
