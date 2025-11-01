import DrawerNavigation from "@/src/components/drawer/DrawerNavigation";
import { Href, usePathname, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname() as Href;

  // Liste des routes où le Drawer ne peut pas être ouvert par swipe
  const routesWithDisabledSwipe: Href[] = ["/"];

  const isSwipeEnabled = !routesWithDisabledSwipe.includes(pathname);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          swipeEnabled: true,
          drawerType: "front",
          overlayColor: "rgba(0,0,0,0.3)",
          drawerStyle: {
            width: "65%",
            // backgroundColor: '#101014',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            elevation: 0,
            shadowColor: "transparent",
          },
        }}
        drawerContent={(props) => <DrawerNavigation />}
      />
    </GestureHandlerRootView>
  );
}
