import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../api/endpoints';
import toast from 'react-hot-toast';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button'; 
import { Mail, Lock } from 'lucide-react'; 

export default function Login() {
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await authAPI.signin(data);
      
     
      if (res.data.message.toLowerCase() === "success") {
        
        login(res.data.token);
        
        toast.success("Welcome Back! ");

    
        window.location.replace("/"); 
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login Failed";
      toast.error(errorMsg);
      console.error("Login Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-[400px]">
      {}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-[#002f95] tracking-tighter">route</h1>
          <p className="text-gray-500 mt-2 font-medium">Log in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
         {}
          <Input 
            name="email"
            type="email"
            placeholder="Email Address"
            register={register}
            icon={Mail}
            error={errors.email}
            required
          />
          
          <Input 
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            icon={Lock}
            error={errors.password}
            required
          />
          
        {}
          <Button loading={isLoading} type="submit" className="mt-4 py-3 text-lg">
            Log In
          </Button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600 mb-4">Don't have an account?</p>
          <Link 
            to="/register" 
            className="bg-[#42b72a] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[#36a420] transition inline-block shadow-md"
          >
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}