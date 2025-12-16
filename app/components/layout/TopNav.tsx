import { Bell, Menu } from "lucide-react";
import Logo from '../../../public/images/no_bg_logo.png';
import Image from 'next/image';
import Link from "next/link";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { useRouter } from "next/navigation";

interface TopNavProps {
  onMenuToggle: () => void;
}

export function TopNav({ onMenuToggle }: TopNavProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logging out user:", user);

    await logout();  // clears sessionStorage and store

    // Redirect to login or home page after logout
    router.push("/login");  // change to "/" if you want home
    router.refresh();       // optional: forces re-render if needed
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-2">
          <button className="lg:hidden" onClick={onMenuToggle}>
            <Menu className="w-6 h-6 text-[#0A3E49]" />
          </button>

          <div className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center">
              <Image src={Logo} alt="ARQADEMY" width={35} height={35} />
            </div>
            <h1 className="hidden md:flex uppercase text-xl font-semibold bg-gradient-to-r bg-[#0A3E49] bg-clip-text text-transparent">
              Arqademy
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white py-2 px-4 rounded-lg font-semibold transition"
          >
            Logout
          </button> */}

          <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <Bell className="w-6 h-6 text-[#0A3E49]" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <div className="w-10 h-10 bg-gradient-to-br from-[#34D2A2] to-[#0A3E49] rounded-full"></div>
        </div>
      </div>
    </header>
  );
}