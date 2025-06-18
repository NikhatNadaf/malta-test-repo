import React from "react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { LogOut, Menu, Moon, Settings, Sun } from "lucide-react";
import { useRouter } from "next/router";
import { supabase } from "@/supabaseConfig";
// import { NotificationPopover } from "./NotificationPopover";

export function AppHeader() {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();


  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className=""
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {/* <NotificationPopover /> */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/user/settings")}
        >
          <Settings className="h-4 w-4" />
        </Button>

        <Button onClick={handleLogout} variant="ghost" size="icon">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
