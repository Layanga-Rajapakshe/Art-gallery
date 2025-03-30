import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error message on submit

    // Basic form validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Set success state
        setSuccess(true);
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Something went wrong with the registration process. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white/90 px-4" 
         style={{ backgroundImage: 'url(./assets/Registerbackground.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Card className="w-full max-w-md bg-black border border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center font-comfortaa text-white">Create an Account</CardTitle>
          <CardDescription className="text-center text-white/70">
            Enter your details to register
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {success && (
              <Alert className="bg-green-900/30 border border-green-500 text-white">
                <AlertDescription>Registration successful! Redirecting to login...</AlertDescription>
              </Alert>
            )}
          
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
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full px-4 py-2 bg-white text-black rounded-md hover:bg-white/90 transition-colors font-medium"
              disabled={loading || success}
            >
              {loading ? 'Signing up...' : success ? 'Registered!' : 'Sign Up'}
            </Button>
          </CardContent>
        </form>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-white/60">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:text-white hover:underline transition-colors">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;