import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Calendar, Clock, CheckCircle2, AlertCircle, XCircle, Building2, TrendingUp, Sparkles } from 'lucide-react-native';

export default function PanelScreen({ navigation, listaEmpresas = [], onUpdate }) {
  const hoy = new Date();

  // 1. Contadores Reales
  const stats = useMemo(() => ({
    total: listaEmpresas.length,
    activas: listaEmpresas.filter(e => e.estado === 'Activo').length,
    pendientes: listaEmpresas.filter(e => e.estado === 'Pago Pendiente').length,
    inactivas: listaEmpresas.filter(e => e.estado === 'Inactivo').length,
  }), [listaEmpresas]);

  // 2. Vencimientos Próximos (No clicables)
  const urgentes = useMemo(() => {
    return listaEmpresas
      .filter(emp => emp.proximoPago && emp.estado === 'Activo')
      .map(emp => {
        const vencimiento = new Date(emp.proximoPago);
        const diffTime = vencimiento.getTime() - hoy.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { ...emp, diasRestantes: diffDays, fechaFormateada: vencimiento.toLocaleDateString() };
      })
      .filter(emp => emp.diasRestantes <= 7)
      .sort((a, b) => a.diasRestantes - b.diasRestantes);
  }, [listaEmpresas]);

  // 3. ACTIVIDAD RECIENTE (Pagos de los últimos 3 días)
  const actividadReciente = useMemo(() => {
    const tresDiasAtras = hoy.getTime() - (3 * 24 * 60 * 60 * 1000);
    const actividades = [];

    listaEmpresas.forEach(emp => {
      (emp.pagos || []).forEach((pago, index) => {
        // Aseguramos que el timestamp sea un número
        const pagoTime = pago.timestamp || Date.now();

        if (pagoTime >= tresDiasAtras) {
          actividades.push({
            id: `pago-${emp.id}-${index}-${pagoTime}`,
            empresa: emp.nombre,
            logo: emp.logo,
            monto: pago.monto,
            fechaPago: pago.fecha,
            fechaVence: pago.proximoVencimiento || 'N/A',
            timestamp: pagoTime
          });
        }
      });
    });
    return actividades.sort((a, b) => b.timestamp - a.timestamp);
  }, [listaEmpresas]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View className="px-6 py-4 bg-white border-b border-slate-100 shadow-sm">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-black text-slate-800">Dashboard</Text>
          <TouchableOpacity className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
             <Bell size={20} color="#4169e1" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>

        {/* Cuadros de Contadores */}
        <View className="px-6 flex-row flex-wrap gap-3 mt-6 mb-6">
          <StatBox label="Empresas" count={stats.total} color="#4169e1" Icon={Building2} />
          <StatBox label="Activas" count={stats.activas} color="#16A34A" Icon={CheckCircle2} />
          <StatBox label="Pendientes" count={stats.pendientes} color="#D97706" Icon={AlertCircle} />
          <StatBox label="Inactivas" count={stats.inactivas} color="#EF4444" Icon={XCircle} />
        </View>

        {/* Sección de Urgentes */}
        <View className="px-6 mb-8">
          <View className="bg-white rounded-[35px] p-6 shadow-sm border border-slate-50">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-slate-800 font-black text-lg">Próximos Vencimientos</Text>
              <View className="bg-red-50 px-3 py-1 rounded-full"><Text className="text-red-600 font-bold text-[10px] uppercase">Urgente</Text></View>
            </View>

            {urgentes.length === 0 ? (
              <View className="py-8 items-center"><Text className="text-slate-400 font-bold">Todo al día</Text></View>
            ) : (
              urgentes.map((emp) => (
                <View key={emp.id} className="flex-row items-center py-4 border-b border-slate-50">
                  <View className="w-12 h-12 bg-slate-50 rounded-2xl items-center justify-center mr-4 border border-slate-100">
                    <Image source={{ uri: emp.logo }} className="w-8 h-8 rounded-md" resizeMode="contain" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-slate-800 text-sm">{emp.nombre}</Text>
                    <Text className="text-slate-400 text-[10px] font-bold uppercase">Vence: {emp.fechaFormateada}</Text>
                  </View>
                  <View className={`px-2 py-1 rounded-lg ${emp.diasRestantes <= 0 ? 'bg-red-50' : 'bg-amber-50'}`}>
                    <Text className={`font-black text-[8px] ${emp.diasRestantes <= 0 ? 'text-red-600' : 'text-amber-600'}`}>{emp.diasRestantes <= 0 ? 'HOY' : `FALTAN ${emp.diasRestantes}D`}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>

        {/* ACTIVIDAD RECIENTE (Donde se muestran los pagos) */}
        <View className="px-6">
          <View className="bg-white rounded-[35px] p-6 shadow-sm border border-slate-50">
            <View className="flex-row items-center mb-8">
              <TrendingUp size={20} color="#4169e1" />
              <Text className="text-slate-800 font-black text-lg ml-3">Actividad Reciente</Text>
            </View>

            {actividadReciente.length === 0 ? (
              <View className="py-12 items-center">
                <Clock size={32} color="#CBD5E1" />
                <Text className="text-gray-400 text-sm font-bold mt-2 text-center">Sin actividad en los{"\n"}últimos 3 días.</Text>
              </View>
            ) : (
              actividadReciente.map((item, index) => (
                <View key={item.id} className="flex-row mb-10">
                  <View className="mr-4 items-center">
                    <View className="w-14 h-14 bg-white rounded-[20px] items-center justify-center shadow-md border border-slate-100 overflow-hidden">
                      <Image source={{ uri: item.logo }} className="w-10 h-10 rounded-lg" resizeMode="contain" />
                    </View>
                    {index !== actividadReciente.length - 1 && <View className="w-[2px] h-full bg-slate-50 mt-4 rounded-full" />}
                  </View>

                  <View className="flex-1">
                    <View className="flex-row justify-between items-start">
                       <Text className="font-black text-slate-800 text-base" numberOfLines={1}>{item.empresa}</Text>
                       <View className="items-end">
                         <Text className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">PAGADO EL</Text>
                         <Text className="text-[10px] font-black text-slate-500">{item.fechaPago}</Text>
                       </View>
                    </View>

                    <View className="bg-[#F8FAFC] p-5 rounded-[28px] mt-3 border border-slate-100">
                      <Text className="text-slate-600 text-xs font-bold leading-5">✅ Se renovó la suscripción con un pago de ${parseFloat(item.monto).toLocaleString()}.</Text>
                      <View className="flex-row items-center mt-4 pt-4 border-t border-slate-200/50">
                        <View className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100"><Calendar size={12} color="#4169e1" /></View>
                        <Text className="text-[10px] font-black text-slate-400 ml-3 uppercase tracking-widest">VENCIMIENTO: <Text className="text-[#4169e1]">{item.fechaVence}</Text></Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ label, count, color, Icon }) {
  return (
    <View className="bg-white p-4 rounded-[22px] flex-1 min-w-[150px] shadow-sm border border-slate-50">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-slate-400 font-bold text-[10px] uppercase">{label}</Text>
        <View style={{ backgroundColor: color + '15' }} className="p-2 rounded-xl"><Icon size={18} color={color} /></View>
      </View>
      <Text className="text-3xl font-black text-slate-800">{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' }
});
