import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DocumentGrid } from "@/components/documents/document-grid";

export default function DocumentsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="border-b border-gray-200 mb-6">
            <div className="sm:flex sm:items-baseline">
              <h3 className="text-2xl font-cormorant font-bold leading-6 text-darkgrey">
                Document Management
              </h3>
              <div className="mt-4 sm:mt-0 sm:ml-10">
                <nav className="-mb-px flex space-x-8">
                  <a
                    href="#all"
                    className="border-burgundy text-burgundy pb-4 px-1 border-b-2 font-medium text-sm"
                  >
                    All Documents
                  </a>
                  <a
                    href="#pending"
                    className="border-transparent text-darkgrey hover:text-burgundy hover:border-lightgold pb-4 px-1 border-b-2 font-medium text-sm"
                  >
                    Pending
                  </a>
                  <a
                    href="#verified"
                    className="border-transparent text-darkgrey hover:text-burgundy hover:border-lightgold pb-4 px-1 border-b-2 font-medium text-sm"
                  >
                    Verified
                  </a>
                </nav>
              </div>
            </div>
          </div>

          <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-medium text-darkgrey mb-3">Document Guidelines</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>Please follow these guidelines when uploading documents:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Documents must be in JPG, JPEG, or PNG format</li>
                <li>Maximum file size is 5MB per document</li>
                <li>Make sure all text in the document is clearly readable</li>
                <li>Government-issued IDs should show your full name and photo</li>
                <li>All documents will be reviewed by parish staff before verification</li>
              </ul>
            </div>
          </div>

          <DocumentGrid />

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-cormorant font-semibold leading-6 text-darkgrey">
                  Document Verification Process
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Understanding the document review timeline.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-burgundy flex items-center justify-center text-white">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-darkgrey">Document Upload</h4>
                    <p className="text-sm text-gray-600">
                      Upload your documents through the secure portal.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-burgundy flex items-center justify-center text-white">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-darkgrey">Initial Review</h4>
                    <p className="text-sm text-gray-600">
                      Parish staff will review your document within 1-2 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-burgundy flex items-center justify-center text-white">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-darkgrey">Verification</h4>
                    <p className="text-sm text-gray-600">
                      Once verified, your document will be marked as "Verified" and added to your permanent record.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
