import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  UserCheck, 
  UserX, 
  CheckCircle, 
  XCircle, 
  Edit, 
  FileText,
  Users,
  UserCog,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div id="admin-page">
      <div className="flex justify-between items-center mb-4">
        <h1>Admin Dashboard</h1>
        <div className="flex gap-2">
          <DownloadProjectButton />
          <DownloadSVGButton elementId="admin-page" filename="admin-dashboard" />
        </div>
      </div>
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<string>(null);

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["/api/admin/users"],
    enabled: true,
  });

  const { data: documents, isLoading: isLoadingDocuments } = useQuery({
    queryKey: ["/api/admin/documents"],
    enabled: true,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a filtered query
    console.log("Searching for:", searchQuery);
  };

  const filteredUsers = users?.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const itemsPerPage = 10;
  const totalPages = filteredUsers ? Math.ceil(filteredUsers.length / itemsPerPage) : 0;
  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="border-b border-gray-200 mb-6">
            <div className="sm:flex sm:items-baseline">
              <h3 className="text-2xl font-cormorant font-bold leading-6 text-darkgrey">
                Administrative Dashboard
              </h3>
              <div className="mt-4 sm:mt-0 sm:ml-10">
                <Tabs defaultValue="users">
                  <TabsList className="-mb-px flex space-x-8">
                    <TabsTrigger 
                      value="users"
                      className="border-b-2 border-transparent text-darkgrey hover:text-burgundy hover:border-lightgold pb-4 px-1 font-medium text-sm data-[state=active]:border-burgundy data-[state=active]:text-burgundy"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      User Management
                    </TabsTrigger>
                    <TabsTrigger 
                      value="documents"
                      className="border-b-2 border-transparent text-darkgrey hover:text-burgundy hover:border-lightgold pb-4 px-1 font-medium text-sm data-[state=active]:border-burgundy data-[state=active]:text-burgundy"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Document Approval
                    </TabsTrigger>
                    <TabsTrigger 
                      value="settings"
                      className="border-b-2 border-transparent text-darkgrey hover:text-burgundy hover:border-lightgold pb-4 px-1 font-medium text-sm data-[state=active]:border-burgundy data-[state=active]:text-burgundy"
                    >
                      <UserCog className="mr-2 h-4 w-4" />
                      System Settings
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="users" className="mt-6">
                    <Card className="mb-6">
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                          <div className="mb-4 md:mb-0">
                            <h4 className="text-lg font-medium text-darkgrey">
                              Member Directory
                            </h4>
                            <p className="text-sm text-gray-500">
                              Manage all parish members and their accounts
                            </p>
                          </div>
                          <form onSubmit={handleSearch} className="w-full md:w-auto">
                            <div className="relative">
                              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                              <Input
                                placeholder="Search users..."
                                className="pl-8 w-full md:w-[300px]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                            </div>
                          </form>
                        </div>
                        
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Registration Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {isLoadingUsers ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                  <TableRow key={index}>
                                    <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-[180px]" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-4 w-[100px] ml-auto" /></TableCell>
                                  </TableRow>
                                ))
                              ) : paginatedUsers && paginatedUsers.length > 0 ? (
                                paginatedUsers.map((user) => (
                                  <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.username}</TableCell>
                                    <TableCell>{user.email || "Not provided"}</TableCell>
                                    <TableCell>
                                      {user.active ? (
                                        <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-100">
                                          Active
                                        </Badge>
                                      ) : (
                                        <Badge variant="destructive">Inactive</Badge>
                                      )}
                                    </TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="h-8 px-2 text-burgundy"
                                        onClick={() => setSelectedUser(user.id)}
                                      >
                                        <Edit className="h-4 w-4 mr-1" /> Edit
                                      </Button>
                                      {user.active ? (
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          className="h-8 px-2 text-red-600"
                                        >
                                          <UserX className="h-4 w-4 mr-1" /> Deactivate
                                        </Button>
                                      ) : (
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          className="h-8 px-2 text-green-600"
                                        >
                                          <UserCheck className="h-4 w-4 mr-1" /> Activate
                                        </Button>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={5} className="text-center py-8">
                                    No users found matching your search criteria
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                        
                        {totalPages > 1 && (
                          <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-500">
                              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers?.length || 0)} of {filteredUsers?.length || 0} users
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="documents" className="mt-6">
                    <Card className="mb-6">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <h4 className="text-lg font-medium text-darkgrey">
                              Pending Document Review
                            </h4>
                            <p className="text-sm text-gray-500">
                              Approve or reject member-submitted documents
                            </p>
                          </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Document Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Submitted By</TableHead>
                                <TableHead>Upload Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {isLoadingDocuments ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                  <TableRow key={index}>
                                    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-4 w-[120px] ml-auto" /></TableCell>
                                  </TableRow>
                                ))
                              ) : documents && documents.length > 0 ? (
                                documents.filter(doc => doc.status === "Pending").map((doc) => (
                                  <TableRow key={doc.id}>
                                    <TableCell className="font-medium">{doc.name}</TableCell>
                                    <TableCell>{doc.type}</TableCell>
                                    <TableCell>{doc.submittedBy}</TableCell>
                                    <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="h-8 px-2"
                                      >
                                        <Search className="h-4 w-4 mr-1" /> View
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="h-8 px-2 text-green-600"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" /> Approve
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="h-8 px-2 text-red-600"
                                      >
                                        <XCircle className="h-4 w-4 mr-1" /> Reject
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={5} className="text-center py-8">
                                    No pending documents to review
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="mt-6">
                    <Card className="mb-6">
                      <CardContent className="pt-6">
                        <h4 className="text-lg font-medium text-darkgrey mb-4">
                          System Settings
                        </h4>
                        
                        <div className="space-y-6">
                          <div>
                            <h5 className="text-base font-medium text-darkgrey mb-2">Parish Information</h5>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="parish-name">Parish Name</Label>
                                <Input id="parish-name" defaultValue="St. Mary's Parish" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="parish-address">Parish Address</Label>
                                <Input id="parish-address" defaultValue="123 Church Street, New York, NY 10001" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="parish-email">Contact Email</Label>
                                <Input id="parish-email" defaultValue="info@stmarysparish.org" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="parish-phone">Contact Phone</Label>
                                <Input id="parish-phone" defaultValue="+1 (555) 123-4567" />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-base font-medium text-darkgrey mb-2">Document Settings</h5>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
                                <Input id="max-file-size" type="number" defaultValue="5" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="allowed-extensions">Allowed File Types</Label>
                                <Input id="allowed-extensions" defaultValue="jpg,jpeg,png" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-4 flex justify-end">
                            <Button className="bg-burgundy hover:bg-burgundy/90">
                              Save Settings
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
