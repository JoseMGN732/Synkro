import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, BriefcaseBusiness, Building2, User, Trash2 } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pantallas
import LoginScreen from '../screens/LoginScreen';
import EmpresasScreen from '../screens/EmpresasScreen';
import GestionScreen from '../screens/GestionScreen';
import PanelScreen from '../screens/PanelScreen';
import AnadirClienteScreen from '../screens/AnadirClienteScreen';
import PerfilScreen from '../screens/PerfilScreen';
import RecuperarEmpresasScreen from '../screens/RecuperarEmpresasScreen';
import DatosPersonalesScreen from '../screens/DatosPersonalesScreen';
import SeguridadScreen from '../screens/SeguridadScreen';
import NotificacionesScreen from '../screens/NotificacionesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EMPRESAS_DEMO = [
  { id: '1', nombre: 'Logística Global', representante: 'Juan Pérez', telefono: '525512345678', correo: 'logistica@global.com', logo: 'https://cdn-icons-png.flaticon.com/128/2830/2830305.png', categoria: 'Premium', estado: 'Activo', diaPago: '15', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '2', nombre: 'Cervezas Artesanales', representante: 'Ana López', telefono: '525587654321', correo: 'ventas@cervezas.com', logo: 'https://cdn-icons-png.flaticon.com/128/761/761767.png', categoria: 'Básico', estado: 'Activo', diaPago: '5', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '3', nombre: 'Sistemas TechNode', representante: 'Carlos Ruiz', telefono: '525511223344', correo: 'admin@technode.com', logo: 'https://cdn-icons-png.flaticon.com/128/606/606203.png', categoria: 'Premium', estado: 'Activo', diaPago: '10', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '4', nombre: 'Restaurante El Sabor', representante: 'María García', telefono: '525544332211', correo: 'contacto@elsabor.com', logo: 'https://cdn-icons-png.flaticon.com/128/1046/1046747.png', categoria: 'Básico', estado: 'Activo', diaPago: '1', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '5', nombre: 'Gimnasio IronBody', representante: 'Pedro Sola', telefono: '525566778899', correo: 'gym@ironbody.com', logo: 'https://cdn-icons-png.flaticon.com/128/2964/2964514.png', categoria: 'Premium', estado: 'Activo', diaPago: '20', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '6', nombre: 'Panadería Delicia', representante: 'Sofía Lara', telefono: '525599887766', correo: 'info@delicia.com', logo: 'https://cdn-icons-png.flaticon.com/128/992/992747.png', categoria: 'Básico', estado: 'Activo', diaPago: '12', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '7', nombre: 'Clínica SaludPlus', representante: 'Dr. Mendez', telefono: '525533445566', correo: 'recepcion@saludplus.com', logo: 'https://cdn-icons-png.flaticon.com/128/2966/2966327.png', categoria: 'Premium', estado: 'Activo', diaPago: '30', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '8', nombre: 'Boutique Elegance', representante: 'Elena Rose', telefono: '525522334455', correo: 'moda@elegance.com', logo: 'https://cdn-icons-png.flaticon.com/128/3081/3081559.png', categoria: 'Básico', estado: 'Activo', diaPago: '7', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '9', nombre: 'Café Aroma', representante: 'Luis Vaca', telefono: '525512121212', correo: 'cafe@aroma.com', logo: 'https://cdn-icons-png.flaticon.com/128/3121/3121768.png', categoria: 'Básico', estado: 'Activo', diaPago: '3', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '10', nombre: 'Taller Mecánico Pro', representante: 'Roberto M.', telefono: '525545454545', correo: 'taller@pro.com', logo: 'https://cdn-icons-png.flaticon.com/128/1048/1048953.png', categoria: 'Premium', estado: 'Activo', diaPago: '15', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '11', nombre: 'Consultoría Estratégica', representante: 'Felipe J.', telefono: '525578787878', correo: 'consultoria@j.com', logo: 'https://cdn-icons-png.flaticon.com/128/3121/3121809.png', categoria: 'Premium', estado: 'Activo', diaPago: '28', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '12', nombre: 'Agencia de Viajes Sky', representante: 'Marta S.', telefono: '525590909090', correo: 'viajes@sky.com', logo: 'https://cdn-icons-png.flaticon.com/128/201/201623.png', categoria: 'Básico', estado: 'Activo', diaPago: '22', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '13', nombre: 'Supermercado Express', representante: 'Hugo T.', telefono: '525530303030', correo: 'express@super.com', logo: 'https://cdn-icons-png.flaticon.com/128/3081/3081648.png', categoria: 'Premium', estado: 'Activo', diaPago: '18', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '14', nombre: 'Florería Pétalos', representante: 'Rosa L.', telefono: '525520202020', correo: 'flores@petalos.com', logo: 'https://cdn-icons-png.flaticon.com/128/616/616430.png', categoria: 'Básico', estado: 'Activo', diaPago: '14', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '15', nombre: 'Inmobiliaria Home', representante: 'David K.', telefono: '525540404040', correo: 'ventas@home.com', logo: 'https://cdn-icons-png.flaticon.com/128/609/609803.png', categoria: 'Premium', estado: 'Activo', diaPago: '11', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '16', nombre: 'Barbería Classic', representante: 'Oscar W.', telefono: '525550505050', correo: 'barber@classic.com', logo: 'https://cdn-icons-png.flaticon.com/128/2571/2571556.png', categoria: 'Básico', estado: 'Activo', diaPago: '25', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '17', nombre: 'Tienda Mascotas Paw', representante: 'Gaby G.', telefono: '525560606060', correo: 'paw@mascotas.com', logo: 'https://cdn-icons-png.flaticon.com/128/616/616408.png', categoria: 'Básico', estado: 'Activo', diaPago: '9', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '18', nombre: 'Ferretería El Clavo', representante: 'Ignacio P.', telefono: '525570707070', correo: 'ferreteria@clavo.com', logo: 'https://cdn-icons-png.flaticon.com/128/3050/3050212.png', categoria: 'Premium', estado: 'Activo', diaPago: '27', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '19', nombre: 'Lavandería Clean', representante: 'Sara M.', telefono: '525580808080', correo: 'clean@lavanderia.com', logo: 'https://cdn-icons-png.flaticon.com/128/2975/2975175.png', categoria: 'Básico', estado: 'Activo', diaPago: '21', proximoPago: new Date().toISOString(), pagos: [] },
  { id: '20', nombre: 'Idiomas Learn', representante: 'Kevin B.', telefono: '525591919191', correo: 'info@learn.com', logo: 'https://cdn-icons-png.flaticon.com/128/2436/2436633.png', categoria: 'Premium', estado: 'Activo', diaPago: '15', proximoPago: new Date().toISOString(), pagos: [] },
];

const CustomTabIcon = ({ focused, Icon, label }) => (
  <View style={[
    styles.tabIconContainer,
    focused && styles.tabIconContainerActive
  ]}>
    <Icon
      color={focused ? '#FFFFFF' : '#94A3B8'}
      size={22}
      strokeWidth={focused ? 2.5 : 2}
    />
    <Text style={[
      styles.tabLabel,
      { color: focused ? '#FFFFFF' : '#94A3B8', fontWeight: focused ? '800' : '600' }
    ]}>
      {label}
    </Text>
  </View>
);

function MainTabs({ navigation, route, ...props }) {
  const { listaEmpresas, setListaEmpresas, onAgregarEmpresa, onRestaurar, onActualizarEmpresa } = props;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Panel"
        options={{ tabBarIcon: (props) => <CustomTabIcon {...props} Icon={LayoutDashboard} label="Panel" /> }}
      >
        {(screenProps) => <PanelScreen {...screenProps} listaEmpresas={listaEmpresas} onUpdate={onActualizarEmpresa} />}
      </Tab.Screen>
      <Tab.Screen
        name="Empresas"
        options={{ tabBarIcon: (props) => <CustomTabIcon {...props} Icon={BriefcaseBusiness} label="Empresas" /> }}
      >
        {(screenProps) => <EmpresasScreen {...screenProps} listaEmpresas={listaEmpresas} setListaEmpresas={setListaEmpresas} onUpdate={onActualizarEmpresa} />}
      </Tab.Screen>
      <Tab.Screen
        name="Añadir"
        options={{ tabBarIcon: (props) => <CustomTabIcon {...props} Icon={Building2} label="Añadir" /> }}
      >
        {(screenProps) => <AnadirClienteScreen {...screenProps} onAgregar={onAgregarEmpresa} />}
      </Tab.Screen>
      <Tab.Screen
        name="Papelera"
        options={{ tabBarIcon: (props) => <CustomTabIcon {...props} Icon={Trash2} label="Recuperar" /> }}
      >
        {(screenProps) => <RecuperarEmpresasScreen {...screenProps} onRestaurar={onRestaurar} />}
      </Tab.Screen>
      <Tab.Screen
        name="Perfil"
        options={{ tabBarIcon: (props) => <CustomTabIcon {...props} Icon={User} label="Perfil" /> }}
      >
        {(screenProps) => <PerfilScreen {...screenProps} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [listaEmpresas, setListaEmpresas] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const guardado = await AsyncStorage.getItem('@lista_empresas_pagos');
        let empresasExistentes = guardado ? JSON.parse(guardado) : [];

        // Forzamos que las demos estén activas y venzan HOY si no hay pagos
        const demoIds = new Set(EMPRESAS_DEMO.map(d => d.id));
        const listaActualizada = empresasExistentes.map(emp => {
          if (demoIds.has(emp.id)) {
            const demoData = EMPRESAS_DEMO.find(d => d.id === emp.id);
            return {
              ...emp,
              ...demoData,
              pagos: emp.pagos || [],
              proximoPago: emp.pagos && emp.pagos.length > 0 ? emp.proximoPago : new Date().toISOString()
            };
          }
          return emp;
        });

        const idsExistentes = new Set(listaActualizada.map(e => e.id));
        const nuevasDemos = EMPRESAS_DEMO.filter(demo => !idsExistentes.has(demo.id));
        const listaFinal = [...listaActualizada, ...nuevasDemos];

        setListaEmpresas(listaFinal);
        await AsyncStorage.setItem('@lista_empresas_pagos', JSON.stringify(listaFinal));
      } catch (e) {
        console.error("Error AppNavigator:", e);
        setListaEmpresas(EMPRESAS_DEMO);
      }
    };
    cargarDatos();
  }, []);

  const agregarEmpresa = async (nuevaEmpresa) => {
    const nuevaLista = [...listaEmpresas, nuevaEmpresa];
    setListaEmpresas(nuevaLista);
    await AsyncStorage.setItem('@lista_empresas_pagos', JSON.stringify(nuevaLista));
  };

  const restaurarEmpresa = async (empresa) => {
    const nuevaLista = [...listaEmpresas, empresa];
    setListaEmpresas(nuevaLista);
    await AsyncStorage.setItem('@lista_empresas_pagos', JSON.stringify(nuevaLista));
  };

  const actualizarEmpresa = async (empresaActualizada) => {
    setListaEmpresas(prevLista => {
      const nuevaLista = prevLista.map(emp => emp.id === empresaActualizada.id ? empresaActualizada : emp);
      AsyncStorage.setItem('@lista_empresas_pagos', JSON.stringify(nuevaLista));
      return nuevaLista;
    });
  };

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main">
        {(props) => (
          <MainTabs
            {...props}
            listaEmpresas={listaEmpresas}
            setListaEmpresas={setListaEmpresas}
            onAgregarEmpresa={agregarEmpresa}
            onRestaurar={restaurarEmpresa}
            onActualizarEmpresa={actualizarEmpresa}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Gestion" component={GestionScreen} />
      <Stack.Screen name="DatosPersonales" component={DatosPersonalesScreen} />
      <Stack.Screen name="Seguridad" component={SeguridadScreen} />
      <Stack.Screen name="Notificaciones" component={NotificacionesScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    elevation: 30,
    paddingBottom: 25,
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  tabIconContainerActive: {
    backgroundColor: '#4169e1',
    shadowColor: '#4169e1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  tabLabel: {
    fontSize: 9,
    marginTop: 2,
  }
});
