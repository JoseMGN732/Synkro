import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView, Image, TextInput, Alert, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, CheckCircle2, XCircle, AlertCircle, ArrowLeft, ReceiptText, X } from 'lucide-react-native';

export default function GestionScreen({ route, navigation }) {
  const { empresa, onUpdate } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);

  if (!empresa) {
    return (
      <SafeAreaView style={styles.container} className="items-center justify-center bg-white">
        <Text>Cargando datos...</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4 p-4 bg-[#4169e1] rounded-2xl">
          <Text className="text-white font-bold">Regresar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const [estado, setEstado] = useState(empresa.estado);
  const [monto, setMonto] = useState('');
  const [pagosLocales, setPagosLocales] = useState(empresa.pagos || []);

  const manejarCambioEstado = (nuevoEstado) => {
    setEstado(nuevoEstado);
    if (onUpdate) {
        onUpdate({ ...empresa, estado: nuevoEstado });
    }
  };

  const registrarPago = () => {
    if (!monto) {
      Alert.alert("Error", "Ingresa un monto para registrar el pago.");
      return;
    }

    const ahora = new Date();

    // Calculamos la nueva fecha de vencimiento (1 mes después de hoy)
    const nuevaFechaVence = new Date(ahora);
    nuevaFechaVence.setMonth(ahora.getMonth() + 1);

    const nuevoPago = {
      fecha: ahora.toLocaleDateString(),
      hora: ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      monto: monto,
      motivo: 'Pago Suscripción',
      timestamp: ahora.getTime(), // CRUCIAL PARA EL DASHBOARD
      proximoVencimiento: nuevaFechaVence.toLocaleDateString()
    };

    const nuevaListaPagos = [...pagosLocales, nuevoPago];
    setPagosLocales(nuevaListaPagos);

    const empresaActualizada = {
        ...empresa,
        estado: 'Activo',
        pagos: nuevaListaPagos,
        proximoPago: nuevaFechaVence.toISOString()
    };

    if (onUpdate) {
        onUpdate(empresaActualizada);
    }

    setEstado('Activo');
    setMonto('');
    Alert.alert("Éxito", "Pago registrado y actividad enviada al Dashboard.");
  };

  const enviarMensajeWhatsApp = () => {
    if (!empresa.telefono) {
      Alert.alert("Error", "No hay un número de teléfono registrado.");
      return;
    }
    const telefonoLimpio = empresa.telefono.replace(/\D/g, '');
    const mensaje = `Hola *${empresa.nombre}*, te saluda el *Ing. Uriel* de *SynkroERP*. 👨‍💻\n\nTe contacto para informarte que tu pago está próximo a vencer. Por favor, asegúrate de realizarlo a tiempo para seguir disfrutando de nuestros servicios.\n\n¡Quedo a tus órdenes!`;
    const url = `whatsapp://send?phone=${telefonoLimpio}&text=${encodeURIComponent(mensaje)}`;

    Linking.canOpenURL(url).then(supported => {
      if (supported) Linking.openURL(url);
      else Linking.openURL(`https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(mensaje)}`);
    });
  };

  const totalVentas = pagosLocales.reduce((acc, p) => acc + parseFloat(p.monto || 0), 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View className="bg-white rounded-t-[40px] h-[80%] p-8 shadow-2xl">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-black text-slate-900">Historial de Pagos</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-slate-100 p-2 rounded-full">
                <X color="#64748B" size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {pagosLocales.length === 0 ? (
                <View className="py-20 items-center">
                  <ReceiptText size={60} color="#CBD5E1" />
                  <Text className="text-slate-400 mt-4 font-bold">Sin pagos registrados</Text>
                </View>
              ) : (
                [...pagosLocales].reverse().map((p, i) => (
                  <View key={i} className="bg-slate-50 p-5 rounded-3xl mb-4 border border-slate-100 flex-row items-center justify-between">
                    <View>
                      <Text className="text-slate-900 font-black text-lg">${parseFloat(p.monto).toLocaleString()}</Text>
                      <Text className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-tighter">{p.motivo || 'Pago Suscripción'}</Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-slate-600 font-bold">{p.fecha}</Text>
                      <Text className="text-slate-400 text-[10px] font-bold">{p.hora}</Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View className="px-6 py-4 flex-row items-center bg-white border-b border-slate-100">
        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-slate-50 p-2 rounded-xl border border-slate-100">
          <ArrowLeft color="#4169e1" size={20} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-black text-slate-800 mr-10">Gestión de Empresa</Text>
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-8">
          <View className="bg-white p-2 rounded-[30px] shadow-sm border border-slate-50">
            <Image source={{ uri: empresa.logo }} className="w-24 h-24 rounded-[22px]" />
          </View>
          <Text className="text-2xl font-black text-slate-900 mt-4 text-center">{empresa.nombre}</Text>
          {empresa.proximoPago && (
            <View className="bg-blue-50 px-4 py-1.5 rounded-full mt-2 border border-blue-100">
              <Text className="text-[#4169e1] font-black text-[10px] uppercase">Vence: {new Date(empresa.proximoPago).toLocaleDateString()}</Text>
            </View>
          )}
        </View>

        <View className="flex-row gap-2 mb-8">
          <StatusBtn label="Habilitar" active={estado === 'Activo'} color="#4169e1" icon={CheckCircle2} onPress={() => manejarCambioEstado('Activo')} />
          <StatusBtn label="Pendiente" active={estado === 'Pago Pendiente'} color="#d97706" icon={AlertCircle} onPress={() => manejarCambioEstado('Pago Pendiente')} />
          <StatusBtn label="Inactivo" active={estado === 'Inactivo'} color="#dc2626" icon={XCircle} onPress={() => manejarCambioEstado('Inactivo')} />
        </View>

        {estado === 'Pago Pendiente' && (
          <View className="bg-amber-50 p-5 rounded-[24px] border border-amber-100 mb-8 flex-row items-center shadow-sm">
            <AlertCircle color="#92400e" size={24} />
            <Text className="text-amber-900 font-medium flex-1 ml-3 leading-5">Esta empresa no se ha contactado con el dueño y no se sabe si va a seguir pagando o no.</Text>
          </View>
        )}
        {estado === 'Inactivo' && (
          <View className="bg-red-50 p-5 rounded-[24px] border border-red-100 mb-8 flex-row items-center shadow-sm">
            <AlertCircle color="#991b1b" size={24} />
            <Text className="text-red-900 font-medium flex-1 ml-3 leading-5">Esta empresa tiene un pago pendiente. El servicio se suspenderá automáticamente en 24h.</Text>
          </View>
        )}

        <View className="bg-white p-6 rounded-[35px] border border-slate-100 mb-8 shadow-sm">
          <Text className="font-black text-slate-800 mb-4 text-xs uppercase tracking-widest text-center">Registrar Nuevo Pago</Text>
          <View className="bg-slate-50 flex-row items-center px-4 rounded-2xl border border-slate-100 mb-4">
             <Text className="text-slate-400 font-black mr-2">$</Text>
             <TextInput keyboardType="numeric" value={monto} onChangeText={setMonto} placeholder="Ingresa el Monto" className="flex-1 py-4 font-black text-slate-900" />
          </View>
          <TouchableOpacity onPress={registrarPago} className="bg-[#4169e1] py-4 rounded-2xl shadow-lg shadow-blue-300">
            <Text className="text-white text-center font-black text-base">Guardar y Activar</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white p-8 rounded-[40px] border border-slate-100 mb-6 shadow-sm">
          <Text className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1 text-center">Ingresos Totales</Text>
          <Text className="text-4xl font-black text-slate-900 mb-6 text-center">${totalVentas.toLocaleString()}</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-blue-50 p-5 rounded-[24px] items-center flex-row justify-center border border-blue-100"
          >
            <ReceiptText color="#4169e1" size={20} />
            <Text className="text-[#4169e1] font-black ml-3">Historial de Pagos</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={enviarMensajeWhatsApp} className="bg-green-500 p-5 rounded-[28px] items-center flex-row justify-center mt-2 shadow-lg shadow-green-200">
          <MessageCircle color="white" size={22} />
          <Text className="text-white font-black text-lg ml-3">Enviar Recordatorio</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatusBtn({ label, active, color, icon: Icon, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 p-4 rounded-2xl items-center border ${active ? '' : 'bg-white border-slate-100'}`}
      style={active ? { backgroundColor: color, borderColor: color } : {}}
    >
      <Icon color={active ? 'white' : color} size={18} />
      <Text className={`font-black text-[10px] mt-2 uppercase ${active ? 'text-white' : 'text-slate-500'}`}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  }
});
