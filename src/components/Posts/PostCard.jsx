import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { postsAPI } from '../../api/endpoints';
import Comment from './Comment';
import { useState } from 'react';

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false); 

  const handleLike = async () => {
    try {
      await postsAPI.toggleLike(post._id);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Like error", err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-5 border border-gray-200 overflow-hidden">
     {}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-3">
          <img src={post.user.image} className="w-10 h-10 rounded-full object-cover border" alt="user" />
          <div>
            <h4 className="font-bold text-[15px] hover:underline cursor-pointer">{post.user.name}</h4>
            <span className="text-gray-500 text-xs block">{new Date(post.createdAt).toLocaleString()}</span>
          </div>
        </div>
        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition"><MoreHorizontal size={20}/></button>
      </div>

{}
      <div className="px-4 py-2 text-[15px] leading-relaxed text-gray-800">
        <p>{post.content}</p>
      </div>
{}
      {post.image && (
        <div className="mt-2 bg-gray-50 flex justify-center border-y border-gray-100">
          <img src={post.image} className="max-h-[500px] w-full object-contain" alt="post content" />
        </div>
      )}
{}
      <div className="flex px-2 py-1 border-t mx-2 mt-2">
        <button 
          onClick={handleLike} 
          className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-md transition font-semibold ${isLiked ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <ThumbsUp size={18}/> Like
        </button>
        <button 
          onClick={() => setShowComments(!showComments)} 
          className="flex-1 flex justify-center items-center gap-2 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-md transition"
        >
          <MessageCircle size={18}/> Comment
        </button>
        <button className="flex-1 flex justify-center items-center gap-2 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-md transition">
          <Share2 size={18}/> Share
        </button>
      </div>
{}
      {showComments && <Comment postId={post._id} />}
    </div>
  );
}