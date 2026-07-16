import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Building2, User, Lock, Eye, EyeOff, LogIn } from 'lucide-react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Reset para entrar a la App sin poder regresar al Login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <SafeAreaView style={customStyles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center px-8 pt-10">

            {/* Logo con sombreado Pro Blue (Cambiado color a #4169e1) */}
            <View style={customStyles.logoContainer} className="bg-[#4169e1] p-5 rounded-[24px] mb-6">
              <Building2 color="white" size={40} />
            </View>

            <Text className="text-4xl font-extrabold text-[#1E293B] mb-2 text-center tracking-tight">
              Inicio de Sesión
            </Text>
            <Text className="text-[#64748B] text-base mb-10 text-center px-4 leading-6 font-medium">
              Inicia sesión para gestionar tus clientes
            </Text>

            {/* Login Card con sombreado sutil */}
            <View style={customStyles.card} className="w-full bg-white p-6 rounded-[32px] mb-8">

              {/* Usuario */}
              <View className="w-full mb-5">
                <Text className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-2 ml-1">
                  Nombre de Usuario
                </Text>
                <View className="flex-row items-center bg-[#F8FAFC] px-4 py-4 rounded-2xl border border-[#E2E8F0]">
                  <User size={18} color="#4169e1" />
                  <TextInput
                    className="ml-3 flex-1 text-[#1E293B] font-semibold text-sm"
                    placeholder="usuario_admin"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
              </View>

              {/* Contraseña */}
              <View className="w-full mb-8">
                <Text className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-2 ml-1">
                  Contraseña
                </Text>
                <View className="flex-row items-center bg-[#F8FAFC] px-4 py-4 rounded-2xl border border-[#E2E8F0]">
                  <Lock size={18} color="#4169e1" />
                  <TextInput
                    className="ml-3 flex-1 text-[#1E293B] font-semibold text-sm"
                    placeholder="••••••••"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} color="#94A3B8" /> : <Eye size={18} color="#94A3B8" />}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Botón Pro Blue (Cambiado color a #4169e1) */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={customStyles.loginButton}
                className="w-full bg-[#4169e1] py-5 rounded-2xl flex-row items-center justify-center"
                onPress={handleLogin}
              >
                <Text className="text-white font-black text-lg mr-2 uppercase tracking-wider">Entrar</Text>
                <LogIn size={20} color="white" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} className="mb-10">
              <Text className="text-[#4169e1] font-black text-sm uppercase tracking-widest">¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <View className="flex-row items-center w-full mb-8">
              <View className="flex-1 h-[0.5px] bg-[#CBD5E1]" />
              <Text className="px-4 text-[9px] text-[#94A3B8] font-black uppercase tracking-[3px]">
                Confiado por empresas
              </Text>
              <View className="flex-1 h-[0.5px] bg-[#CBD5E1]" />
            </View>

            {/* Imagen con el Sombreado Pro */}
            <View style={customStyles.footerImageWrapper} className="w-full">
              <View className="w-full h-44 rounded-[32px] overflow-hidden border-2 border-white">
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600' }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 bg-[#4169e1]/5" />
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  logoContainer: {
    shadowColor: '#4169e1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 12,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  loginButton: {
    shadowColor: '#4169e1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  footerImageWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.18,
    shadowRadius: 35,
    elevation: 20,
    marginBottom: 40,
  }
});