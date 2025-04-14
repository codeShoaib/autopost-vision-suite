import React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock authentication function
  const handleAuth = async (email: string, password: string, isSignUp: boolean) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email && password) {
      // In a real app, you would integrate with your auth system here
      navigate('/');
      return;
    }
    
    throw new Error('Invalid credentials');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-purple/10 to-brand-indigo/5 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold gradient-text">AutoPost</h1>
          <p className="mt-2 text-xl text-gray-600">Your AI-powered social media assistant</p>
        </div>
        
        <AuthForm onAuth={handleAuth} />
      </div>
    </div>
  );
};

export default AuthPage;
