import axios from 'axios';
import { db, storage } from '@/firebase/client';
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { toast } from 'sonner';

interface ProcessResponse {
  result: string;
}

export const fetchHRPolicy = async (): Promise<string> => {
  const policyRef = ref(storage, 'HR-policy.pdf');
  const downloadUrl = await getDownloadURL(policyRef);
  return downloadUrl;
};

export const saveKeywordToGraph = async (keyword: string) => {
  try {
    const keywordRef = doc(db, 'graph', keyword);
    const keywordDoc = await getDocs(collection(db, 'graph'));

    const keywordExists = keywordDoc.docs.some(doc => doc.id === keyword);

    if (keywordExists) {
      const existingDoc = keywordDoc.docs.find(doc => doc.id === keyword);
      const frequency = existingDoc?.data().frequency || 0;
      await updateDoc(keywordRef, { frequency: frequency + 1 });
    } else {
      await setDoc(keywordRef, { keyword, frequency: 1 });
    }

    console.log(`Keyword ${keyword} saved to graph.`);
  } catch (err) {
    console.error('Error saving keyword to graph:', err);
    toast.error('Error saving keyword.');
  }
};

export const fetchBadWords = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'badwords'));
    const badWordsList = querySnapshot.docs.map(doc => doc.data().word);
    return badWordsList;
  } catch (error) {
    console.error('Error fetching bad words from Firestore:', error);
    toast.error('Error fetching bad words.');
    return [];
  }
};

export const processPrompt = async (
  newChatLog: { message: string, isBot: boolean }[],
  prompt: string
) => {
  const formData = new FormData();
  formData.append('prompt', prompt);

  const result = await axios.post<ProcessResponse>('http://localhost:5000/process', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return [...newChatLog, { message: result.data.result, isBot: true }];
};

export const splitPrompt = (prompt: string): string[] => {
  return prompt.split(' ').map(word => word.toLowerCase());
};
