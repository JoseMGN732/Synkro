import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Search, Trash2, ArrowLeft } from 'lucide-react-native';

export default function EmpresasScreen({ navigation, listaEmpresas = [], setListaEmpresas, onUpdate }) {
  const [filtro, setFiltro] = useState('');

  const ejecutarEliminacion = (empresa) => {
    Alert.alert(
      "Mover a Papelera",
      `¿Deseas enviar a "${empresa.nombre}" a la papelera?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Mover",
          style: "destructive",
          onPress: async () => {
            const nuevaLista = listaEmpresas.filter(item => item.id !== empresa.id);
            setListaEmpresas(nuevaLista);
            await AsyncStorage.setItem('@lista_empresas_pagos', JSON.stringify(nuevaLista));
            
            const guardadoEliminadas = await AsyncStorage.getItem('@lista_empresas_eliminadas');
            const eliminadas = guardadoEliminadas ? JSON.parse(guardadoEliminadas) : [];
            await AsyncStorage.setItem('@lista_empresas_eliminadas', JSON.stringify([...eliminadas, empresa]));
          }
        }
      ]
    );
  };

  const getEstadoStyles = (estado) => {
    switch (estado) {
      case 'Activo': return { color: '#16A34A', bg: '#F0FDF4' };
      case 'Pago Pendiente': return { color: '#D97706', bg: '#FFFBEB' };
      case 'Inactivo': return { color: '#EF4444', bg: '#FEF2F2' };
      default: return { color: '#64748B', bg: '#F8FAFC' };
    }
  };

  const empresasFiltradas = listaEmpresas.filter(emp =>
    emp.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <SafeAreaView style={customStyles.container} edges={['top']}>
      <View className="px-6 py-4 bg-white border-b border-slate-50">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => navigation.navigate('Panel')}
            className="bg-slate-50 p-2 rounded-xl border border-slate-100 mr-4"
          >
            <ArrowLeft color="#4169e1" size={20} />
          </TouchableOpacity>
          <Text className="flex-1 text-2xl font-black text-[#1E293B]">Empresas</Text>
          <TouchableOpacity className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
             <Search color="#94A3B8" size={20} />
          </TouchableOpacity>
        </View>

        <View style={customStyles.searchBar} className="flex-row items-center bg-[#F1F5F9] px-5 py-4 rounded-2xl border border-[#E2E8F0]">
          <TextInput
            placeholder="Buscar empresa por nombre..."
            placeholderTextColor="#94A3B8"
            className="flex-1 text-[#1E293B] font-bold text-sm"
            value={filtro}
            onChangeText={setFiltro}
          />
        </View>
      </View>

      <ScrollView className="px-6" contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }} showsVerticalScrollIndicator={false}>
        {empresasFiltradas.length === 0 ? (
          <View className="items-center justify-center py-24">
            <Text className="text-[#94A3B8] font-bold">No hay empresas registradas</Text>
          </View>
        ) : (
          empresasFiltradas.map((emp) => {
            const totalPagado = (emp.pagos || []).reduce((acc, p) => acc + (parseFloat(p.monto) || 0), 0);
            const { color, bg } = getEstadoStyles(emp.estado);

            return (
              <TouchableOpacity
                key={emp.id}
                activeOpacity={0.8}
                style={customStyles.card}
                className="bg-white p-5 rounded-[28px] mb-4 flex-row items-center"
                onPress={() => navigation.navigate('Gestion', { empresa: emp, onUpdate: onUpdate })}
              >
                <View className="w-14 h-14 bg-slate-50 rounded-2xl items-center justify-center mr-4 border border-slate-100">
                  <Image source={{ uri: emp.logo }} className="w-10 h-10 rounded-lg" resizeMode="contain" />
                </View>

                <View className="flex-1">
                  <Text className="font-black text-[#1E293B] text-base mb-1">{emp.nombre}</Text>
                  <View className="flex-row items-center">
                    <Text className="text-[#4169e1] font-black text-[10px] uppercase tracking-wider">Monto: ${totalPagado.toLocaleString()}</Text>
                  </View>
                </View>

                <View className="flex-row items-center gap-2">
                  <View style={{ backgroundColor: bg }} className="px-3 py-1.5 rounded-full border border-white">
                    <Text style={{ color }} className="text-[8px] font-black uppercase tracking-tighter">{emp.estado}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => ejecutarEliminacion(emp)}
                    style={customStyles.deleteButton}
                    className="p-3 bg-red-50 rounded-2xl"
                  >
                    <Trash2 color="#EF4444" size={18} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const customStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  searchBar: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  deleteButton: {
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2
  }
});
