import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Modal, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Lock, Fingerprint, ShieldCheck, X, Eye, EyeOff, CheckCircle2 } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SeguridadScreen({ navigation }) {
  const [biometrics, setBiometrics] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPass, setShowPassword] = useState(false);

  // Estado para el cambio de contraseña
  const [passData, setPassData] = useState({
    actual: '',
    nueva: '',
    confirmar: ''
  });

  // Cargar preferencia de biometría al iniciar
  useEffect(() => {
    const loadSettings = async () => {
      const val = await AsyncStorage.getItem('@pref_biometrics');
      setBiometrics(val === 'true');
    };
    loadSettings();
  }, []);

  // Guardar preferencia de biometría
  const toggleBiometrics = async (value) => {
    setBiometrics(value);
    await AsyncStorage.setItem('@pref_biometrics', value ? 'true' : 'false');
    if(value) {
      Alert.alert("Seguridad", "Acceso biométrico activado correctamente.");
    }
  };

  const handleCambiarPass = () => {
    if (!passData.actual || !passData.nueva || !passData.confirmar) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }
    if (passData.nueva !== passData.confirmar) {
      Alert.alert("Error", "La nueva contraseña y la confirmación no coinciden.");
      return;
    }

    // Simulación de éxito
    Alert.alert("Éxito", "Tu contraseña ha sido actualizada correctamente.", [
      { text: "OK", onPress: () => {
        setModalVisible(false);
        setPassData({ actual: '', nueva: '', confirmar: '' });
      }}
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
      {/* Header Profesional Blue */}
      <View className="px-6 py-4 flex-row items-center bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#3B4FE4" size={24} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-[#1E293B] mr-6">Seguridad</Text>
      </View>

      <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
        <Text className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-4 ml-1">
          Configuración de Acceso
        </Text>

        {/* Cambiar Contraseña Card */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
          className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm flex-row items-center mb-4"
        >
          <View className="bg-[#EEF2FF] p-3.5 rounded-2xl mr-4">
            <Lock size={22} color="#3B4FE4" />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-[#1E293B] text-base">Cambiar Contraseña</Text>
            <Text className="text-[#64748B] text-xs mt-0.5">Actualiza tu clave de acceso regularmente</Text>
          </View>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>

        {/* Biometría Card */}
        <View className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm flex-row items-center mb-8">
          <View className="bg-[#EEF2FF] p-3.5 rounded-2xl mr-4">
            <Fingerprint size={22} color="#3B4FE4" />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-[#1E293B] text-base">Face ID / Huella Digital</Text>
            <Text className="text-[#64748B] text-xs mt-0.5">Activa el acceso rápido seguro</Text>
          </View>
          <Switch
            value={biometrics}
            onValueChange={toggleBiometrics}
            trackColor={{ false: "#E2E8F0", true: "#A5B4FC" }}
            thumbColor={biometrics ? "#3B4FE4" : "#F4F4F5"}
          />
        </View>

        {/* Status Card */}
        <View className="bg-[#F0FDF4] p-8 rounded-[32px] border border-[#DCFCE7] items-center">
          <View className="bg-white p-3 rounded-full shadow-sm mb-4">
            <ShieldCheck size={36} color="#16A34A" />
          </View>
          <Text className="text-[#14532D] font-bold text-lg text-center">Tu cuenta está protegida</Text>
          <Text className="text-[#166534] text-xs text-center mt-2 px-4 leading-5">
            Hemos detectado que tu nivel de seguridad es óptimo. Sigue así para mantener tus datos a salvo.
          </Text>
        </View>
      </ScrollView>

      {/* MODAL CAMBIO DE CONTRASEÑA */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-end"
        >
          <View className="bg-white rounded-t-[40px] shadow-2xl p-8 border-t border-gray-100">
            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-2xl font-black text-[#1E293B]">Nueva Clave</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-100 p-2 rounded-full"
              >
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View className="space-y-5">
              <PassInput
                label="CONTRASEÑA ACTUAL"
                value={passData.actual}
                onChange={(t) => setPassData({...passData, actual: t})}
                show={showPass}
                onToggle={() => setShowPassword(!showPass)}
              />
              <PassInput
                label="NUEVA CONTRASEÑA"
                value={passData.nueva}
                onChange={(t) => setPassData({...passData, nueva: t})}
                show={showPass}
                onToggle={() => setShowPassword(!showPass)}
              />
              <PassInput
                label="CONFIRMAR CONTRASEÑA"
                value={passData.confirmar}
                onChange={(t) => setPassData({...passData, confirmar: t})}
                show={showPass}
                onToggle={() => setShowPassword(!showPass)}
              />
            </View>

            <TouchableOpacity
              onPress={handleCambiarPass}
              className="bg-[#3B4FE4] py-5 rounded-2xl items-center mt-8 shadow-lg shadow-blue-600/30"
            >
              <Text className="text-white font-black text-lg">Actualizar Ahora</Text>
            </TouchableOpacity>

            <View className="h-10" />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

function PassInput({ label, value, onChange, show, onToggle }) {
  return (
    <View className="mb-4">
      <Text className="text-[10px] font-black text-[#94A3B8] mb-2 ml-1 uppercase tracking-widest">{label}</Text>
      <View className="flex-row items-center bg-[#F8FAFC] px-4 py-4 rounded-xl border border-[#E2E8F0]">
        <TextInput
          secureTextEntry={!show}
          className="flex-1 text-[#1E293B] font-bold"
          placeholder="••••••••"
          value={value}
          onChangeText={onChange}
        />
        <TouchableOpacity onPress={onToggle}>
          {show ? <EyeOff size={18} color="#94A3B8" /> : <Eye size={18} color="#94A3B8" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ChevronRight({ size, color }) {
  return (
    <View style={{ transform: [{ rotate: '0deg' }] }}>
      <ArrowLeft size={size} color={color} style={{ transform: [{ rotate: '180deg' }] }} />
    </View>
  );
}
