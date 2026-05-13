import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MessageCircle } from "lucide-react";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const { data: settings } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      return data;
    },
  });

  const wa = settings?.whatsapp?.replace(/\D/g, "");

  return (
    <div className="min-h-screen flex flex-col">
      <Header phone={settings?.phone} whatsapp={settings?.whatsapp} logoUrl={settings?.logo_url} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings ?? undefined} />
      {wa && (
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-glow hover:scale-110 transition"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      )}
    </div>
  );
}
