import { Bell, Menu, School } from "lucide-react";
import Logo from '../../../public/images/no_bg_logo.png'
import Image, { StaticImageData } from 'next/image';

interface TopNavProps {
  onMenuToggle: () => void;
}

interface ImageProp {
    src: string | StaticImageData | Blob | undefined; 
    alt?: string;
}

export function TopNav({ onMenuToggle }: TopNavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          {/* ✅ Call toggle function when menu icon is clicked */}
          <button className="lg:hidden" onClick={onMenuToggle}>
            <Menu className="w-6 h-6 text-[#0A3E49]" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <Image src={ Logo } alt="ARQADEMY" width={40} height={40} />
            </div>
            <h1 className="uppercase text-2xl font-bold bg-gradient-to-r from-[#34D2A2] to-[#0A3E49] bg-clip-text text-transparent">
              Arqademy
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
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
