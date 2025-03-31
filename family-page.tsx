import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FamilyMemberTable } from "@/components/family/family-member-table";

export default function FamilyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="border-b border-gray-200 mb-6">
            <div className="sm:flex sm:items-baseline">
              <h3 className="text-2xl font-cormorant font-bold leading-6 text-darkgrey">
                Family Management
              </h3>
              <div className="mt-4 sm:mt-0 sm:ml-10">
                <nav className="-mb-px flex space-x-8">
                  <a
                    href="#members"
                    className="border-burgundy text-burgundy pb-4 px-1 border-b-2 font-medium text-sm"
                  >
                    Members
                  </a>
                  <a
                    href="#tree"
                    className="border-transparent text-darkgrey hover:text-burgundy hover:border-lightgold pb-4 px-1 border-b-2 font-medium text-sm"
                  >
                    Family Tree
                  </a>
                </nav>
              </div>
            </div>
          </div>

          <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-medium text-darkgrey mb-3">Family Information</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                Managing your family information helps the parish better serve you and ensures that all your records are properly maintained. Family members added here will be associated with your profile.
              </p>
              <p>
                <strong>Note:</strong> Each adult family member should have their own account for accessing personal documents and information.
              </p>
            </div>
          </div>

          <FamilyMemberTable />

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-xl font-cormorant font-semibold leading-6 text-darkgrey">
                Family Tree
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Visual representation of your family relationships.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="text-center py-10">
                <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Family tree view coming soon</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add family members to start building your family tree.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
