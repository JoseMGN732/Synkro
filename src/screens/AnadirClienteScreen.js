import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle, Building2, User, Phone, Mail, Calendar, Package, Link as LinkIcon, Sparkles } from 'lucide-react-native';

export default function AnadirClienteScreen({ navigation, onAgregar }) {
  const [paso, setPaso] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    representante: '',
    telefono: '',
    correo: '',
    logo: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
    plan: 'Básico',
    diaPago: '1'
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const guardarEmpresa = async () => {
    if (!formData.nombre || !formData.telefono) {
      Alert.alert("Campos obligatorios", "Por favor ingresa el nombre y el teléfono.");
      return;
    }

    try {
      const hoy = new Date();
      const nuevaEmpresa = {
        id: Date.now().toString(),
        nombre: formData.nombre,
        representante: formData.representante,
        telefono: formData.telefono.replace(/\D/g, ''),
        correo: formData.correo,
        logo: formData.logo,
        categoria: formData.plan,
        estado: 'Activo',
        diaPago: formData.diaPago,
        proximoPago: hoy.toISOString(),
        pagos: []
      };

      if (onAgregar) {
        await onAgregar(nuevaEmpresa);
      }

      Alert.alert("¡Éxito!", "Empresa guardada correctamente.", [
        { text: "OK", onPress: () => navigation.navigate('Empresas') }
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la empresa.");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header Premium */}
      <View className="px-6 py-4 flex-row items-center border-b border-slate-100 bg-white">
        <TouchableOpacity
          onPress={() => paso === 2 ? setPaso(1) : navigation.goBack()}
          className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 mr-4"
        >
          <ArrowLeft color="#4169e1" size={20} />
        </TouchableOpacity>
        <Text className="text-2xl font-black text-[#1E293B]">
          {paso === 1 ? 'Nuevo Cliente' : 'Finalizar'}
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Indicador de Progreso Estilizado */}
        <View className="px-6 pt-6 mb-8">
           <View className="flex-row justify-between items-end mb-3">
              <View>
                <Text className="text-[10px] font-black text-[#4169e1] uppercase tracking-[2px]">Progreso del Registro</Text>
                <Text className="text-slate-400 text-xs font-bold mt-1">Paso {paso} de 2</Text>
              </View>
              <Sparkles size={18} color="#4169e1" />
           </View>
           <View className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
             <View
               className="h-full bg-[#4169e1] rounded-full"
               style={{ width: paso === 1 ? '50%' : '100%' }}
             />
           </View>
        </View>

        {paso === 1 ? (
          <View className="px-6">
            <View className="mb-6">
                <Text className="text-2xl font-black text-slate-900 leading-8">Información{"\n"}General</Text>
                <Text className="text-slate-400 text-sm font-medium mt-1">Completa los datos básicos del negocio.</Text>
            </View>

            <InputLabel
                icon={Building2}
                label="NOMBRE DE LA EMPRESA"
                placeholder="Ej. Tech Solutions S.A."
                value={formData.nombre}
                onChange={(val) => handleInputChange('nombre', val)}
            />
            
            <InputLabel
                icon={User}
                label="REPRESENTANTE"
                placeholder="Nombre del dueño o encargado"
                value={formData.representante}
                onChange={(val) => handleInputChange('representante', val)}
            />

            <InputLabel
                icon={Phone}
                label="TELÉFONO DE CONTACTO"
                placeholder="+52..."
                value={formData.telefono}
                onChange={(val) => handleInputChange('telefono', val)}
                keyboardType="phone-pad"
            />

            <InputLabel
                icon={Mail}
                label="CORREO ELECTRÓNICO"
                placeholder="contacto@empresa.com"
                value={formData.correo}
                onChange={(val) => handleInputChange('correo', val)}
                keyboardType="email-address"
            />

            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-[#4169e1] p-5 rounded-[28px] mt-8 flex-row items-center justify-center shadow-xl shadow-blue-200"
              onPress={() => setPaso(2)}
            >
              <Text className="text-white font-black text-lg mr-2">Siguiente Paso</Text>
              <CheckCircle color="white" size={20} />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="px-6">
            <View className="mb-8">
                <Text className="text-2xl font-black text-slate-900 leading-8">Perfil y{"\n"}Configuración</Text>
                <Text className="text-slate-400 text-sm font-medium mt-1">Personaliza el logo y los detalles de pago.</Text>
            </View>

            <View className="items-center mb-10">
               <View className="bg-white p-3 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-50">
                  <Image source={{ uri: formData.logo }} className="w-32 h-32 rounded-[32px]" />
                  <View className="absolute -bottom-2 -right-2 bg-[#4169e1] p-3 rounded-2xl border-4 border-white">
                     <Sparkles color="white" size={16} />
                  </View>
               </View>
               <Text className="text-slate-400 text-[10px] mt-6 font-black uppercase tracking-widest">Vista Previa del Logo</Text>
            </View>

            <InputLabel
                icon={LinkIcon}
                label="URL DEL LOGO (PEGAR LINK)"
                placeholder="https://ejemplo.com/logo.png"
                value={formData.logo}
                onChange={(val) => handleInputChange('logo', val)}
            />

            <InputLabel
                icon={Calendar}
                label="DÍA DE PAGO (CADA MES)"
                placeholder="Ej. 1"
                value={formData.diaPago}
                onChange={(val) => handleInputChange('diaPago', val)}
                keyboardType="numeric"
            />

            <InputLabel
                icon={Package}
                label="PLAN O CATEGORÍA"
                placeholder="Ej. Premium / Básico"
                value={formData.plan}
                onChange={(val) => handleInputChange('plan', val)}
            />

            <View className="bg-green-50 p-6 rounded-[32px] border border-green-100 flex-row items-center mt-8">
              <View className="bg-green-500 p-2 rounded-full">
                <CheckCircle color="white" size={16} />
              </View>
              <Text className="ml-4 text-green-800 font-bold flex-1 text-xs">¡Todo listo! Revisa que los datos sean correctos antes de guardar.</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-[#4169e1] p-5 rounded-[28px] mt-10 shadow-2xl shadow-blue-300"
              onPress={guardarEmpresa}
            >
              <Text className="text-white font-black text-center text-lg uppercase tracking-wider">Guardar Empresa</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function InputLabel({ label, placeholder, value, onChange, keyboardType = 'default', icon: Icon }) {
  return (
    <View className="mb-6">
      <Text className="text-[10px] font-black text-slate-400 mb-2.5 uppercase tracking-widest ml-1">{label}</Text>
      <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-[22px] px-5 py-0.5 shadow-sm shadow-slate-100">
        <Icon size={18} color="#94A3B8" />
        <TextInput
          className="flex-1 ml-3 py-4 text-slate-900 font-bold text-sm"
          placeholder={placeholder}
          placeholderTextColor="#CBD5E1"
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});
