import { MaterialIcons, Ionicons, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { StyleSheet, Pressable } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#B8D9D3',
        tabBarInactiveTintColor: '#fff',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#282A36',
          borderTopWidth: 0,

          bottom: 15,
          left: 15,
          right: 15,
          elevation: 0,
          borderRadius: 15,
          height: 70,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="home" size={size} color={color} />;
            }

            return <Ionicons name="home-outline" size={size} color={color} />;
          },
          headerRight: () => (
            <Link href="/profile" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="person-circle"
                    size={48}
                    color="#fff"
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerStyle: {
            backgroundColor: '#3E4A59',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <Tabs.Screen
        name="celulas"
        options={{
          title: 'Celulas',
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <FontAwesome6 name="people-roof" size={size} color={color} />;
            }
            return <FontAwesome6 name="people-roof" size={size} color={color} />;
          },
          headerRight: () => (
            <Link href="/profile" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="person-circle"
                    size={48}
                    color="#fff"
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerStyle: {
            backgroundColor: '#3E4A59',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <Tabs.Screen
        name="eventos"
        options={{
          title: 'Eventos',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return <MaterialIcons name="event" size={30} color={color} />;
            }
            return <MaterialIcons name="event" size={30} color={color} />;
          },
          headerRight: () => (
            <Link href="/profile" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="person-circle"
                    size={48}
                    color="#fff"
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerStyle: {
            backgroundColor: '#3E4A59',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <AntDesign name="appstore1" size={size} color={color} />;
            }
            return <AntDesign name="appstore1" size={size} color={color} />;
          },
          headerRight: () => (
            <Link href="/profile" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="person-circle"
                    size={48}
                    color="#fff"
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerStyle: {
            backgroundColor: '#3E4A59',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  headerRight: {
    marginRight: 20,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
