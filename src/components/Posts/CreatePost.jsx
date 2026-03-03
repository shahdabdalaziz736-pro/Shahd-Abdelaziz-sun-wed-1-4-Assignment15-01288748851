import { useForm } from 'react-hook-form';
import { postsAPI } from '../../api/endpoints';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Image, Send } from 'lucide-react';

export default function CreatePost({ refresh }) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('content', data.content);
    

    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    try {
      await postsAPI.createPost(formData);
      toast.success("Post Shared Successfully!");
      reset();
      refresh(); 
    } catch (err) {
      console.error("Create Post Error:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 transition-all">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3 items-start">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#002f95] font-bold">
            U
          </div>
          <textarea 
            {...register('content')} 
            className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-0 resize-none text-[15px] outline-none" 
            placeholder="What's on your mind?"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition text-sm">
            <Image size={20} className="text-green-500" />
            <span>Photo</span>
            <input 
              {...register('image')} 
              type="file" 
              className="hidden" 
              accept="image/*"
            />
          </label>

          <button 
            disabled={loading}
            className="bg-[#002f95] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-800 transition disabled:bg-gray-400"
          >
            {loading ? "Posting..." : (
              <>
                <Send size={18} />
                <span>Post</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}