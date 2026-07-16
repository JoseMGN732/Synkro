import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { ArrowLeft, Mail } from 'lucide-react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecover = async () => {
    if (!email) return Alert.alert("Error", "Por favor ingresa un correo.");
    
    setLoading(true);
    try {
      // Sustituye por la URL de tu servidor real
      const response = await fetch('https://tu-servidor.com/api/recuperar-contrasena', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email }) // Envía el correo o teléfono
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Se han enviado instrucciones a tu cuenta.");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.message || "Usuario no encontrado.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100 p-6">
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-6">
        <ArrowLeft color="#4F46E5" size={24} />
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-gray-900 mb-2">Recuperar cuenta</Text>
      <Text className="text-gray-500 mb-8">Ingresa el correo o número de teléfono registrado:</Text>

      <View className="bg-white p-4 rounded-2xl border border-gray-100 mb-6 flex-row items-center shadow-lg shadow-indigo-100">
        <Mail size={20} color="#4F46E5" className="mr-3" />
        <TextInput 
          className="flex-1 text-gray-700"
          placeholder="ejemplo@correo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity 
        className="bg-indigo-600 py-4 rounded-2xl items-center shadow-lg shadow-indigo-600/30"
        onPress={handleRecover}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-base">Enviar instrucciones</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}