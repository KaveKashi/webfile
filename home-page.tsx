import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { toast } = useToast();
  const { data: user } = useQuery({
    queryKey: ["/api/user"],
  });

  const { data: announcements, isLoading: isLoadingAnnouncements } = useQuery({
    queryKey: ["/api/announcements"],
    enabled: true,
  });

  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["/api/events"],
    enabled: true,
  });

  // Initialize stats data on component mount
  useEffect(() => {
    const initStats = async () => {
      try {
        await apiRequest("GET", "/api/stats");
      } catch (error) {
        // Error is handled by query client
      }
    };
    initStats();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="border-b border-gray-200 mb-6">
            <div className="sm:flex sm:items-baseline">
              <h3 className="text-2xl font-cormorant font-bold leading-6 text-darkgrey">
                Welcome, {user?.username}
              </h3>
              <div className="mt-4 sm:mt-0 sm:ml-10">
                <nav className="-mb-px flex space-x-8">
                  <a
                    href="#dashboard"
                    className="border-burgundy text-burgundy pb-4 px-1 border-b-2 font-medium text-sm"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#announcements"
                    className="border-transparent text-darkgrey hover:text-burgundy hover:border-lightgold pb-4 px-1 border-b-2 font-medium text-sm"
                  >
                    Announcements
                  </a>
                  <a
                    href="#events"
                    className="border-transparent text-darkgrey hover:text-burgundy hover:border-lightgold pb-4 px-1 border-b-2 font-medium text-sm"
                  >
                    Events
                  </a>
                </nav>
              </div>
            </div>
          </div>

          <section id="dashboard">
            <DashboardStats />
          </section>

          <section id="recent-activity" className="mb-8">
            <Tabs defaultValue="announcements">
              <TabsList className="mb-6">
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
                <TabsTrigger value="events">Upcoming Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="announcements">
                <Card>
                  <CardContent className="pt-6">
                    {isLoadingAnnouncements ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="border-b pb-4">
                            <Skeleton className="h-6 w-1/3 mb-2" />
                            <Skeleton className="h-4 w-2/3 mb-1" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        ))}
                      </div>
                    ) : announcements && announcements.length > 0 ? (
                      <div className="space-y-4">
                        {announcements.map((announcement) => (
                          <div key={announcement.id} className="border-b pb-4 last:border-b-0">
                            <h4 className="text-lg font-medium text-burgundy">
                              {announcement.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-1">
                              Posted on {new Date(announcement.date).toLocaleDateString()}
                            </p>
                            <p className="text-darkgrey">{announcement.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <h4 className="text-lg font-medium text-gray-500">No announcements yet</h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Check back later for parish announcements
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="events">
                <Card>
                  <CardContent className="pt-6">
                    {isLoadingEvents ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="border-b pb-4">
                            <Skeleton className="h-6 w-1/3 mb-2" />
                            <Skeleton className="h-4 w-1/4 mb-1" />
                            <Skeleton className="h-4 w-2/3 mb-1" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        ))}
                      </div>
                    ) : events && events.length > 0 ? (
                      <div className="space-y-4">
                        {events.map((event) => (
                          <div key={event.id} className="border-b pb-4 last:border-b-0">
                            <h4 className="text-lg font-medium text-burgundy">
                              {event.title}
                            </h4>
                            <p className="text-sm font-medium text-gray-600 mb-1">
                              {new Date(event.date).toLocaleDateString()} at {event.time}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              Location: {event.location}
                            </p>
                            <p className="text-darkgrey">{event.description}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <h4 className="text-lg font-medium text-gray-500">No upcoming events</h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Check back later for upcoming parish events
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          <section id="quick-links" className="mb-8">
            <h3 className="text-xl font-cormorant font-semibold text-darkgrey mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <svg className="h-5 w-5 text-burgundy mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-lg font-medium">Mass Schedule</h4>
                  </div>
                  <p className="text-sm text-gray-600">View the weekly mass schedule and special services</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <svg className="h-5 w-5 text-burgundy mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h4 className="text-lg font-medium">Parish Directory</h4>
                  </div>
                  <p className="text-sm text-gray-600">Find contact information for parish staff and ministries</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <svg className="h-5 w-5 text-burgundy mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <h4 className="text-lg font-medium">Online Giving</h4>
                  </div>
                  <p className="text-sm text-gray-600">Securely donate to support our parish and ministries</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
