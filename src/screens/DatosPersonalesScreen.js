import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Mail, Phone, Briefcase } from 'lucide-react-native';

export default function DatosPersonalesScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="px-6 py-4 flex-row items-center bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#4F46E5" size={24} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-indigo-900 mr-6">Datos Personales</Text>
      </View>

      <ScrollView className="p-6">
        <View className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm mb-6">
          <InfoField icon={User} label="Nombre Completo" value="Ing. Uriel Cambron Hernandez" />
          <InfoField icon={Mail} label="Correo Electrónico" value="uriel.cambron@synkro.com" />
          <InfoField icon={Phone} label="Teléfono" value="+52 55 1234 5678" />
          <InfoField icon={Briefcase} label="Puesto / Cargo" value="Administrador Senior" />
        </View>

        <TouchableOpacity
          className="bg-indigo-600 p-4 rounded-2xl items-center shadow-lg"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-bold text-lg">Guardar Cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoField({ icon: Icon, label, value }) {
  return (
    <View className="mb-6 last:mb-0">
      <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">{label}</Text>
      <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
        <Icon size={20} color="#6366F1" />
        <TextInput
          className="ml-3 flex-1 text-gray-800 font-medium"
          defaultValue={value}
          editable={true}
        />
      </View>
    </View>
  );
}
