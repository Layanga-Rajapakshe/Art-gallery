import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Important for storing cookies
      });

      const data = await response.json();

      if (response.ok) {
        // Store tokens in localStorage for use in API calls
        if (data.access) localStorage.setItem('accessToken', data.access);
        if (data.refresh) localStorage.setItem('refreshToken', data.refresh);
        
        // Store basic user data if available
        if (data.user) {
          localStorage.setItem('userData', JSON.stringify(data.user));
        }
        
        console.log('Login successful');
        // Navigate to the home page after successful login
        navigate('/');
      } else {
        setError(data.error || data.detail || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white/90 px-4">
      <Card className="w-full max-w-md bg-black border border-white/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center font-comfortaa text-white">Welcome Back</CardTitle>
          <CardDescription className="text-center text-white/70">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-white/10 border border-red-400 text-white">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/90">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="your_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full px-4 py-2 bg-white text-black rounded-md hover:bg-white/90 transition-colors font-medium"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-white/60">
            <Link to="/forgot-password" className="hover:text-white transition-colors">
              Forgot your password?
            </Link>
          </div>
          <div className="text-sm text-center text-white/60">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white hover:text-white hover:underline transition-colors">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;