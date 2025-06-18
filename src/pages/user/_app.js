import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { AppHeader } from "@/components/dashboard/app-header";
import { useEffect } from "react";
import { supabase } from "@/supabaseConfig";
import { useAuthState } from "@/context/ueAuthContext";
import addUserToDatabase from "@/features/addUser";
import { getUserFromDatabase } from "@/features/getUser";
import Auth from "@/components/auth";
import { home } from "@/data/link";

// Menu items.
const items = [
  {
    category: "Overview",
    items: [
      {
        title: "Home",
        url: home,
        icon: Home,
      },
      {
        title: "Dashboard",
        url: "/user/dashboard",
        icon: Home,
      },
    ],
  },
  {
    category: "Bookings",
    items: [
      {
        title: "Upcoming Bookings",
        url: "/user/upcoming-bookings",
        icon: Inbox,
        badge: "New",
      },
      {
        title: "Past Bookings",
        url: "/user/past-bookings",
        icon: Calendar,
      },
      {
        title: "Cancelled Bookings",
        url: "/user/cancelled-bookings",
        icon: Calendar,
      },
    ],
  },
  {
    category: "Preferences",
    items: [
      {
        title: "Favorite Trip",
        url: "/user/favorite-trip",
        icon: Search,
      },
      {
        title: "Settings",
        url: "/user/settings",
        icon: Settings,
      },
    ],
  },
];

export default function UserWrapper({ children, pageProps }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const { session, setSession, setUser } = useAuthState();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        addUserToDatabase(session.user);

        const fetchUserData = async () => {
          const user = await getUserFromDatabase(session?.user.id);
          if (user) {
            setUser(user);
          }
        };

        fetchUserData();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth />;
  }

  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full overflow-hidden">
          <Sidebar>
            <SidebarHeader>
              <div className="flex justify-center items-center hover:cursor-pointer">
                <Link href={home}>
                  <Image src="/images/logo.svg" height={100} width={150} />
                </Link>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((group, idx) => (
                      <div key={idx} className="mb-6">
                        <h3 className="px-4 mb-2 text-sm font-semibold text-gray-600">
                          {group.category}
                        </h3>
                        {group.items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              isActive={currentPath == item.url}
                              className="w-full rounded-lg transition-colors hover:bg-gray-100"
                              asChild
                            >
                              <Link
                                href={item.url}
                                className="flex items-center gap-2 px-4 py-2"
                              >
                                <item.icon className="h-5 w-5" />
                                <span>{item.title}</span>
                                {item.badge && (
                                  <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div className="flex flex-1 flex-col">
            <AppHeader />
            {/* <SidebarTrigger /> */}
            <SidebarInset>
              <main className="p-8">{children}</main>
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
