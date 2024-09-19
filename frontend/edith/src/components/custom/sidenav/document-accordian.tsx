import React, { useState, useEffect } from 'react';
import { storage } from '@/firebase/client'; // Import your Firebase storage
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react'; // Add Chevron icons
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

interface Document {
  name: string;
  url: string;
}

const DocumentAccordion: React.FC<{ isCollapsed: boolean; userRole: string }> = ({ isCollapsed, userRole }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false); // For handling accordion toggle

  const getFolderPathForRole = (role: string) => {
    switch (role) {
      case 'Developer':
        return 'developers/';
      case 'Intern':
        return 'interns/';
      case 'Manager':
        return 'managers/';
      default:
        return 'public';
    }
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const folderPath = getFolderPathForRole(userRole);
        const folderRef = ref(storage, folderPath);
        const result = await listAll(folderRef);

        const documentPromises = result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        });

        const documentsList = await Promise.all(documentPromises);
        setDocuments(documentsList);
      } catch (error) {
        console.error('Failed to fetch documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [userRole]);

  return (
    <AccordionItem value="documents" className="border-none">
      <AccordionTrigger className={`flex items-center text-left no-underline hover:no-underline ${isCollapsed ? 'justify-center' : ''}`}>
              <FileText className="w-5 h-5 mr-2" />
              {!isCollapsed && <span>Documents</span>}
            </AccordionTrigger>
      <AccordionContent>
        {loading ? (
          <Skeleton className="h-10 w-40 rounded mx-auto" />
        ) : (
          documents.length > 0 ? (
            <ul className="list-none mx-auto">
              {documents.map((doc) => (
                <Button key={doc.name} className="bg-[#232323]" variant={'ghost'}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sm no-underline">
                    {doc.name}
                  </a>
                </Button>
              ))}
            </ul>
          ) : (
            <p className="text-center">No documents available.</p>
          )
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default DocumentAccordion;
