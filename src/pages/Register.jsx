import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { authAPI } from '../api/endpoints';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button'; 
import { User, Mail, Lock, Calendar, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = yup.object({
  name: yup.string().min(3, 'Name is too short').required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/^[A-Z]/, 'Password must start with an uppercase letter') 
    .required('Password is required'),
  rePassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  gender: yup.string().required('Please select your gender'),
}).required();

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: yupResolver(schema),
    mode: 'onTouched'
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await authAPI.signup(data);
    
      if (res.data.message === 'success') {
        toast.success('Account Created! Please login to continue.');
        navigate('/login');
      }
    } catch (err) {
      console.error("Signup Error:", err);
      toast.error(err.response?.data?.message || 'Error creating account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 animate-fadeIn">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#002f95] tracking-tighter mb-2">route</h1>
          <h2 className="text-xl font-bold text-gray-700">Create a new account</h2>
          <p className="text-gray-500 text-sm">It's quick and easy.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          <Input name="name" icon={User} register={register} error={errors.name} placeholder="Full Name" />
          
          <Input name="email" type="email" icon={Mail} register={register} error={errors.email} placeholder="Email Address" />
          
          <Input name="password" type="password" icon={Lock} register={register} error={errors.password} placeholder="New Password" />
          
          <Input name="rePassword" type="password" icon={Lock} register={register} error={errors.rePassword} placeholder="Confirm Password" />
          
          <div className="flex flex-col mb-4">
            <label className="text-xs text-gray-500 font-bold mb-1 ml-1 uppercase">Date of Birth</label>
            <Input name="dateOfBirth" type="date" icon={Calendar} register={register} error={errors.dateOfBirth} />
          </div>

          <div className="flex flex-col mb-6">
            <label className="text-xs text-gray-500 font-bold mb-1 ml-1 uppercase">Gender</label>
            <div className="relative">
              <Users className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <select 
                {...register('gender')} 
                className={`w-full p-3 pl-10 border-2 rounded-lg outline-none transition-all appearance-none bg-gray-50 
                ${errors.gender ? 'border-red-500 focus:border-red-600' : 'border-gray-100 focus:border-[#002f95] focus:bg-white'}`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {errors.gender && <p className="text-red-500 text-[11px] mt-1 ml-1">{errors.gender.message}</p>}
          </div>

          <Button loading={isLoading} type="submit" className="py-3 text-lg mt-2 bg-[#42b72a] hover:bg-[#36a420]">
            Sign Up
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}