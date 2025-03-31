import { ChurchCalendar } from "@/components/calendar/church-calendar";
import { Footer } from "@/components/layout/footer";
import { PublicNavbar } from "@/components/layout/public-navbar";

export default function CalendarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ChurchCalendar />
        </div>
      </main>
      <Footer />
    </div>
  );
}