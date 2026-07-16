import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Shield, Bell, LogOut, User, LogOut as LogOutIcon, Settings, ArrowLeft } from 'lucide-react-native';

export default function PerfilScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const ejecutarLogout = () => {
    setModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={customStyles.container} edges={['top']}>
      {/* Header Premium */}
      <View className="px-6 py-4 flex-row items-center bg-white border-b border-gray-100">
        <TouchableOpacity
          onPress={() => navigation.navigate('Panel')}
          className="bg-slate-50 p-2 rounded-xl border border-slate-100 mr-4"
        >
          <ArrowLeft color="#4169e1" size={20} />
        </TouchableOpacity>
        <Text className="flex-1 text-2xl font-black text-[#1E293B]">
          Mi Perfil
        </Text>
        <TouchableOpacity className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
           <Settings size={22} color="#4169e1" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 160 }}
      >
        <Text className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-6 ml-1">
          Información de Cuenta
        </Text>

        {/* Perfil Card Premium */}
        <View style={customStyles.profileCard} className="items-center bg-white p-8 rounded-[40px] mb-8 border border-slate-50">
          <View style={customStyles.avatarContainer} className="bg-blue-50 rounded-full mb-5 items-center justify-center border-4 border-white">
             <User size={60} color="#4169e1" />
          </View>
          <Text className="text-2xl font-black text-[#1E293B] text-center">Uriel Cambron Hernandez</Text>
          <View className="bg-blue-50 px-4 py-1.5 rounded-full mt-3 border border-blue-100">
             <Text className="text-[#4169e1] font-black text-[10px] uppercase tracking-widest">Administrador Senior</Text>
          </View>
        </View>

        {/* Menú de Opciones con estilo Pro */}
        <View>
           <MenuOption
             icon={User}
             title="Datos Personales"
             desc="Gestiona tu información de contacto"
             onPress={() => navigation.navigate('DatosPersonales')}
           />
           <MenuOption
             icon={Shield}
             title="Seguridad y Acceso"
             desc="Contraseña y biometría"
             onPress={() => navigation.navigate('Seguridad')}
           />
           <MenuOption
             icon={Bell}
             title="Notificaciones"
             desc="Configura tus avisos de pago"
             onPress={() => navigation.navigate('Notificaciones')}
           />
        </View>

        {/* Cerrar Sesión con estilo Pro */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={customStyles.logoutButton}
          className="mt-8 bg-red-50 p-6 rounded-[32px] flex-row items-center justify-center border border-red-100"
          onPress={() => setModalVisible(true)}
        >
          <LogOut size={22} color="#EF4444" />
          <Text className="ml-3 text-[#EF4444] font-black text-lg uppercase tracking-wider">Cerrar Sesión</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* MODAL PREMIUM DE LOGOUT */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60 px-8">
          <View style={customStyles.modalContainer} className="bg-white w-full rounded-[40px] p-10 items-center">
            <View className="bg-[#FEF2F2] p-6 rounded-full mb-6">
              <LogOutIcon size={48} color="#EF4444" />
            </View>

            <Text className="text-2xl font-black text-[#1E293B] mb-2 text-center">¿Ya te vas?</Text>
            <Text className="text-[#64748B] text-center mb-10 text-base font-medium leading-6">
              Estás a punto de cerrar sesión. Tus datos seguirán seguros.
            </Text>

            <View className="flex-row gap-4 w-full">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="flex-1 bg-[#F1F5F9] py-5 rounded-[20px] items-center"
              >
                <Text className="text-[#64748B] font-black text-base">Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={ejecutarLogout}
                style={customStyles.modalLogoutButton}
                className="flex-1 bg-[#EF4444] py-5 rounded-[20px] items-center"
              >
                <Text className="text-white font-black text-base">Salir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function MenuOption({ icon: Icon, title, desc, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={customStyles.card}
      className="bg-white p-5 rounded-[28px] flex-row items-center mb-4 border border-slate-50"
      onPress={onPress}
    >
      <View className="bg-slate-50 p-3.5 rounded-[18px] mr-4 border border-slate-100">
        <Icon size={22} color="#4169e1" />
      </View>
      <View className="flex-1">
        <Text className="font-black text-[#1E293B] text-base">{title}</Text>
        <Text className="text-[#94A3B8] text-xs font-medium mt-0.5">{desc}</Text>
      </View>
      <View className="bg-slate-50 p-2 rounded-full">
         <ChevronRight size={18} color="#CBD5E1" />
      </View>
    </TouchableOpacity>
  );
}

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  profileCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 8,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    shadowColor: '#4169e1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 4,
  },
  logoutButton: {
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  modalContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 25,
  },
  modalLogoutButton: {
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  }
});
