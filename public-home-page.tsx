import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { EventPhotosCarousel } from "@/components/photos/event-photos-carousel";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import type { Announcement, Event, Job } from "shared/schema";

export default function PublicHomePage() {
  // Image slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  
  // Image slider data (later this would come from a database or CMS)
  const sliderImages = [
    {
      title: "Join Us for Sunday Mass",
      description: "Be part of our vibrant community in prayer and worship",
      bgColor: "from-purple-900/80 to-burgundy/90"
    },
    {
      title: "Supporting Our Community",
      description: "See how we're making a difference in our local area",
      bgColor: "from-blue-900/80 to-burgundy/90"
    },
    {
      title: "Faith Formation Programs",
      description: "Grow in faith with our educational opportunities for all ages",
      bgColor: "from-green-900/80 to-burgundy/90"
    },
    {
      title: "Parish Events & Activities",
      description: "Stay connected with what's happening in our parish",
      bgColor: "from-orange-900/80 to-burgundy/90"
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const startAutoSlide = () => {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % sliderImages.length);
      }, 5000); // Change slide every 5 seconds
    };
    
    startAutoSlide();
    
    // Cleanup on unmount
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [sliderImages.length]);
  
  // Handle slide navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // Reset auto-slide timer when manually navigating
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % sliderImages.length);
      }, 5000);
    }
  };

  // Fetch public announcements
  const { data: announcements = [], isLoading: isLoadingAnnouncements } = useQuery<Announcement[]>({
    queryKey: ["/api/public/announcements"],
  });

  // Fetch public events
  const { data: events = [], isLoading: isLoadingEvents } = useQuery<Event[]>({
    queryKey: ["/api/public/events"],
  });

  // Fetch public job listings
  const { data: jobs = [], isLoading: isLoadingJobs } = useQuery<Job[]>({
    queryKey: ["/api/public/jobs"],
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PublicNavbar />
      
      {/* Header/Hero Section with Auto-changing Image Slider */}
      <header className="bg-gradient-to-r from-burgundy to-burgundy/90 text-white relative overflow-hidden h-[500px] md:h-[600px]">
        {/* Background pattern for visual interest */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="currentColor" />
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        
        {/* Image slider */}
        <div className="relative h-full overflow-hidden">
          {sliderImages.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}></div>
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h1 className="text-4xl md:text-5xl font-cormorant font-bold mb-4">
                        {index === 0 ? 'Welcome to St. Mary\'s Parish' : slide.title}
                      </h1>
                      <p className="text-lg mb-8 text-white">
                        {index === 0 
                          ? 'A vibrant Catholic community dedicated to faith, service, and fellowship. Join us in worship and discover our parish life.'
                          : slide.description
                        }
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Button asChild size="lg" className="bg-yellow-400 text-burgundy hover:bg-yellow-300 shadow-lg border-2 border-yellow-500">
                          <a href="#mass-times" className="font-bold">View Mass Times</a>
                        </Button>
                        <Button asChild size="lg" className="bg-white text-burgundy hover:bg-gray-100 shadow-lg border-2 border-white">
                          <a href="#contact-us" className="font-bold">Get Directions</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Slider navigation dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-yellow-400' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Slider navigation arrows */}
          <button 
            onClick={() => goToSlide((currentSlide - 1 + sliderImages.length) % sliderImages.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={() => goToSlide((currentSlide + 1) % sliderImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Photo Banner of Church Events - Auto-changing Carousel */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-cormorant font-bold text-burgundy mb-6 text-center">
            Our Parish Life
          </h2>
          
          {/* Import the EventPhotosCarousel component */}
          <EventPhotosCarousel />
        </div>
      </section>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Parish Information Section */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-cormorant font-bold text-burgundy mb-4">
                Our Parish Community
              </h2>
              <p className="text-darkgrey max-w-3xl mx-auto">
                St. Mary's Parish is a welcoming community of faith where all are invited to 
                encounter Jesus Christ through Word, Sacrament, and Service. We strive to live 
                the Gospel message and to serve the needs of our parish and the wider community.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-burgundy/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-burgundy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl font-cormorant text-darkgrey">
                    Faith Formation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Opportunities for all ages to grow in knowledge and love of our Catholic faith through religious education programs.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-burgundy/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-burgundy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl font-cormorant text-darkgrey">
                    Service & Outreach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Putting our faith into action through various ministries that serve the needs of our parish and local community.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-burgundy/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-burgundy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl font-cormorant text-darkgrey">
                    Sacramental Life
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Celebrating God's grace through the sacraments, from baptism to marriage, and accompanying parishioners through life's journey.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Announcements, Events and Jobs Section */}
          <section className="mb-16">
            <Tabs defaultValue="announcements">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-cormorant font-bold text-burgundy">
                  Parish Updates
                </h2>
                <TabsList>
                  <TabsTrigger value="announcements">Announcements</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="jobs">Job Opportunities</TabsTrigger>
                </TabsList>
              </div>
              
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
                              Posted on {new Date(announcement.createdAt || Date.now()).toLocaleDateString()}
                            </p>
                            <p className="text-darkgrey">{announcement.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <h4 className="text-lg font-medium text-gray-500">No announcements at this time</h4>
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
              
              <TabsContent value="jobs">
                <Card>
                  <CardContent className="pt-6">
                    {isLoadingJobs ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="border-b pb-4">
                            <Skeleton className="h-6 w-1/3 mb-2" />
                            <Skeleton className="h-4 w-1/4 mb-1" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        ))}
                      </div>
                    ) : jobs && jobs.length > 0 ? (
                      <div className="space-y-4">
                        {jobs.map((job) => (
                          <div key={job.id} className="border-b pb-4 last:border-b-0">
                            <h4 className="text-lg font-medium text-burgundy">
                              {job.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-1">
                              Posted on {new Date(job.postedDate || Date.now()).toLocaleDateString()}
                            </p>
                            <p className="text-darkgrey">{job.description}</p>
                            <div className="mt-3">
                              <Button size="sm" variant="outline" className="text-sm bg-burgundy/5 border-burgundy/20 text-burgundy hover:bg-burgundy/10">
                                Learn More About Position
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <h4 className="text-lg font-medium text-gray-500">No job opportunities available</h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Check back later for parish job postings
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* Mass Times Section */}
          <section id="mass-times" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-cormorant font-bold text-burgundy mb-4">
                Mass Times
              </h2>
              <p className="text-darkgrey max-w-2xl mx-auto">
                Join us for the celebration of the Holy Eucharist
              </p>
            </div>
            
            {/* Highlighted upcoming Mass box */}
            <div className="mb-8 bg-burgundy/5 border border-burgundy/20 rounded-lg p-6">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-cormorant font-bold text-burgundy mb-4 flex items-center">
                  <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Upcoming Mass Schedule
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3 text-burgundy">
                    <div className="flex justify-between border-b border-burgundy/20 pb-2">
                      <span className="font-bold">Sunday:</span>
                      <span>8:00 AM, 10:30 AM, 5:00 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-burgundy/20 pb-2">
                      <span className="font-bold">Weekdays:</span>
                      <span>7:30 AM, 12:00 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-burgundy/20 pb-2">
                      <span className="font-bold">Saturday:</span>
                      <span>9:00 AM, 5:30 PM (Vigil)</span>
                    </div>
                  </div>
                  <div className="space-y-3 text-burgundy">
                    <div className="flex justify-between border-b border-burgundy/20 pb-2">
                      <span className="font-bold">Confessions:</span>
                      <span>Saturday 4:00 PM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-burgundy/20 pb-2">
                      <span className="font-bold">Holy Days:</span>
                      <span>7:30 AM, 12:00 PM, 7:00 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-burgundy/20 pb-2">
                      <span className="font-bold">First Friday:</span>
                      <span>Adoration 8:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Sunday Masses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">8:00 AM</span>
                      <span>English</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">10:30 AM</span>
                      <span>English with Choir</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">5:00 PM</span>
                      <span>Youth Mass</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Weekday Masses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday-Friday</span>
                      <span>7:30 AM, 12:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday</span>
                      <span>9:00 AM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Confession Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday</span>
                      <span>4:00 PM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Weekdays</span>
                      <span>11:30 AM - 11:50 AM</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Or by appointment
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Interactive Calendar Section */}
          <section className="mb-16 bg-gray-100 py-10 px-6 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-cormorant font-bold text-burgundy mb-4">
                  Parish Events Calendar
                </h2>
                <p className="text-darkgrey mb-6">
                  Stay up-to-date with all parish activities, masses, and special events with our interactive calendar. 
                  Plan your schedule and never miss an important church event.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-burgundy" />
                  </div>
                  <div>
                    <h4 className="font-medium text-darkgrey">View Full Calendar</h4>
                    <p className="text-sm text-gray-600">Browse all upcoming events</p>
                  </div>
                </div>
                <Button asChild className="mt-6 bg-burgundy hover:bg-burgundy/90">
                  <Link href="/calendar">
                    <span className="inline-flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Open Parish Calendar
                    </span>
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingEvents ? (
                      <div className="space-y-4">
                        {[1, 2].map((i) => (
                          <Skeleton key={i} className="h-16 w-full" />
                        ))}
                      </div>
                    ) : events && events.length > 0 ? (
                      <div className="space-y-4">
                        {events.slice(0, 3).map((event) => (
                          <div key={event.id} className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-burgundy/10 rounded-md flex flex-col items-center justify-center">
                              <span className="text-sm font-bold text-burgundy">
                                {new Date(event.date).getDate()}
                              </span>
                              <span className="text-xs text-burgundy/80">
                                {new Date(event.date).toLocaleString('default', { month: 'short' })}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-darkgrey">{event.title}</h4>
                              <p className="text-sm text-gray-600">
                                {event.time} • {event.location}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="text-center pt-2">
                          <Link href="/calendar">
                            <span className="text-burgundy hover:text-burgundy/80 text-sm font-medium">
                              View all events →
                            </span>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500">No upcoming events</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact-us" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-cormorant font-bold text-burgundy mb-4">
                Contact & Visit
              </h2>
              <p className="text-darkgrey max-w-2xl mx-auto">
                We'd love to hear from you or see you at Mass
              </p>
            </div>
            <Card className="border-burgundy/20 shadow-lg">
              <CardContent className="p-6 bg-gradient-to-br from-white to-burgundy/5">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-cormorant font-bold text-burgundy mb-4">
                      Contact Us
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-burgundy mr-3 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <p className="font-medium">Address:</p>
                          <p className="text-gray-600">123 Main Street</p>
                          <p className="text-gray-600">Anytown, ST 12345</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-burgundy mr-3 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div>
                          <p className="font-medium">Phone:</p>
                          <p className="text-gray-600">(123) 456-7890</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-burgundy mr-3 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="font-medium">Email:</p>
                          <p className="text-gray-600">info@stmarys.example</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-burgundy mr-3 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="font-medium">Office Hours:</p>
                          <p className="text-gray-600">Monday-Friday: 9:00 AM - 5:00 PM</p>
                          <p className="text-gray-600">Saturday: 9:00 AM - 12:00 PM</p>
                          <p className="text-gray-600">Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button asChild size="lg" className="bg-burgundy hover:bg-burgundy/90 text-white">
                      <a href="#mass-times">
                        Visit Us This Sunday
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Pre-Footer Banner */}
      <section className="bg-gradient-to-r from-burgundy to-burgundy/90 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-cormorant font-bold mb-2">Join Our Parish Family</h2>
              <p className="text-white/90">
                Become part of our vibrant Catholic community. Everyone is welcome.
              </p>
            </div>
            <div>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <a href="#contact-us">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}