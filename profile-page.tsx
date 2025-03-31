import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProfileInfo } from "@/components/profile/profile-info";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentGrid } from "@/components/documents/document-grid";
import { FamilyMemberTable } from "@/components/family/family-member-table";

export default function ProfilePage() {
  const { data: user } = useQuery({
    queryKey: ["/api/user"],
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="border-b border-gray-200 mb-6">
            <div className="sm:flex sm:items-baseline">
              <h3 className="text-2xl font-cormorant font-bold leading-6 text-darkgrey">
                Member Management
              </h3>
              <div className="mt-4 sm:mt-0 sm:ml-10">
                <Tabs defaultValue="profile">
                  <TabsList className="-mb-px flex space-x-8">
                    <TabsTrigger 
                      value="profile"
                      className="border-b-2 border-transparent text-darkgrey hover:text-burgundy hover:border-lightgold pb-4 px-1 font-medium text-sm data-[state=active]:border-burgundy data-[state=active]:text-burgundy"
                    >
                      Profile
                    </TabsTrigger>
                    <TabsTrigger 
                      value="family"
                      className="border-b-2 border-transparent text-darkgrey hover:text-burgundy hover:border-lightgold pb-4 px-1 font-medium text-sm data-[state=active]:border-burgundy data-[state=active]:text-burgundy"
                    >
                      Family
                    </TabsTrigger>
                    <TabsTrigger 
                      value="documents"
                      className="border-b-2 border-transparent text-darkgrey hover:text-burgundy hover:border-lightgold pb-4 px-1 font-medium text-sm data-[state=active]:border-burgundy data-[state=active]:text-burgundy"
                    >
                      Documents
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sacraments"
                      className="border-b-2 border-transparent text-darkgrey hover:text-burgundy hover:border-lightgold pb-4 px-1 font-medium text-sm data-[state=active]:border-burgundy data-[state=active]:text-burgundy"
                    >
                      Sacraments
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile" className="mt-6">
                    <ProfileInfo />
                  </TabsContent>
                  
                  <TabsContent value="family" className="mt-6">
                    <FamilyMemberTable />
                  </TabsContent>
                  
                  <TabsContent value="documents" className="mt-6">
                    <DocumentGrid />
                  </TabsContent>
                  
                  <TabsContent value="sacraments" className="mt-6">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-xl font-cormorant font-semibold leading-6 text-darkgrey">
                          Sacramental Records
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Track your sacramental journey in the Catholic faith.
                        </p>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                        <div className="text-center py-10">
                          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">No sacraments recorded</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Please contact the parish office to update your sacramental records.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
