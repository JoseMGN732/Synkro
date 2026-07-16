import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, MessageSquare, AlertTriangle } from 'lucide-react-native';

export default function NotificacionesScreen({ navigation }) {
  const [notifs, setNotifs] = useState({
    pagos: true,
    mensajes: true,
    alertas: false
  });

  const toggleSwitch = (key) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="px-6 py-4 flex-row items-center bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#4F46E5" size={24} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-indigo-900 mr-6">Notificaciones</Text>
      </View>

      <ScrollView className="p-6">
        <Text className="font-bold text-gray-500 mb-4 ml-1">PREFERENCIAS</Text>

        <NotifItem
          icon={Bell}
          title="Recordatorios de Pago"
          desc="Notificar cuando una empresa tenga pagos pendientes"
          value={notifs.pagos}
          onToggle={() => toggleSwitch('pagos')}
        />

        <NotifItem
          icon={MessageSquare}
          title="Mensajes de WhatsApp"
          desc="Confirmación de envíos de mensajes"
          value={notifs.mensajes}
          onToggle={() => toggleSwitch('mensajes')}
        />

        <NotifItem
          icon={AlertTriangle}
          title="Alertas Críticas"
          desc="Notificar sobre suspensiones de servicio"
          value={notifs.alertas}
          onToggle={() => toggleSwitch('alertas')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function NotifItem({ icon: Icon, title, desc, value, onToggle }) {
  return (
    <View className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex-row items-center mb-4">
      <View className="bg-indigo-50 p-3 rounded-2xl mr-4">
        <Icon size={22} color="#4F46E5" />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-gray-800">{title}</Text>
        <Text className="text-gray-500 text-[10px] leading-3 mt-1">{desc}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#CBD5E1", true: "#A5B4FC" }}
        thumbColor={value ? "#4F46E5" : "#F1F5F9"}
      />
    </View>
  );
}
