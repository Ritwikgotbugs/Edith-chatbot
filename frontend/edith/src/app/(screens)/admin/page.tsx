'use client';
import React, { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import MainLayout from "@/components/admin/layout";
import { Input } from '@/components/ui/input';

const PasswordDialog: React.FC<{ onPasswordSuccess: () => void }> = ({ onPasswordSuccess }) => {
  const [password, setPassword] = useState('');
  const correctPassword = 'admin';
  const router = useRouter(); // Updated import

  const handleSubmit = () => {
    if (password === correctPassword) {
      onPasswordSuccess();
    } else {
      toast.error('Password is incorrect');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleDialogClose = () => {
    router.push('/homepage'); // Redirect to home page on dialog close
  };

  return (
    <Dialog open onOpenChange={handleDialogClose}>
      <DialogContent className="bg-black text-white">
        <DialogHeader>
          <DialogTitle>Enter Admin Password</DialogTitle>

        </DialogHeader>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="mt-4 bg-zinc-900 text-white placeholder-gray-400"
          onKeyDown={handleKeyDown}
        />
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="bg-neutral-600 min-h-screen text-white">
      {!isAuthenticated && (
        <PasswordDialog onPasswordSuccess={() => setIsAuthenticated(true)} />
      )}
      {isAuthenticated && <MainLayout />}
    </div>
  );
}
