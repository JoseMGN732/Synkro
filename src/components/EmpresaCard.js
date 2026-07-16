import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

export default function EmpresaCard({ nombre, rubro, estado, onPress }) {
  // Colores dinámicos según estado
  const statusColor = estado === 'Activo' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';

  return (
    <TouchableOpacity onPress={onPress} className="bg-white p-4 rounded-2xl mb-3 flex-row items-center justify-between border border-slate-100 shadow-sm">
      <View className="flex-row items-center">
        <View className="w-12 h-12 bg-slate-100 rounded-xl mr-4" />
        <View>
          <Text className="font-bold text-slate-800 text-base">{nombre}</Text>
          <Text className="text-slate-400 text-xs">{rubro}</Text>
        </View>
      </View>
      <View className={`px-2 py-1 rounded-md ${statusColor}`}>
        <Text className="text-[10px] font-bold">{estado}</Text>
      </View>
    </TouchableOpacity>
  );
}