'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import MainLayout from "@/components/admin/layout";
import { Input } from '@/components/ui/input';

const PasswordDialog: React.FC<{ onPasswordSuccess: () => void }> = ({ onPasswordSuccess }) => {
  const [password, setPassword] = useState('');
  const correctPassword = 'admin';

  const handleSubmit = () => {
    if (password === correctPassword) {
      onPasswordSuccess();
    } else {
      toast.error('Password is incorrect');
    }
  };

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Password</DialogTitle>
          <DialogDescription>
            Please enter the password to access this page.
          </DialogDescription>
        </DialogHeader>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="mt-4"
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
    <>
      {!isAuthenticated && (
        <PasswordDialog onPasswordSuccess={() => setIsAuthenticated(true)} />
      )}
      {isAuthenticated && <MainLayout />}
    </>
  );
}
