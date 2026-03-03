import { useEffect, useState, useCallback } from 'react';
import { postsAPI } from '../api/endpoints';
import PostCard from '../components/Posts/PostCard';
import CreatePost from '../components/Posts/CreatePost'; 
import toast from 'react-hot-toast';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 
  const getAllPosts = useCallback(async () => {
    
    try {
      const res = await postsAPI.getFeed();
      if (res.data && res.data.posts) {
        setPosts(res.data.posts);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      toast.error("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <div className="max-w-[600px] mx-auto space-y-5 animate-fadeIn">
  {}
      <CreatePost refresh={getAllPosts} />

      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-20 gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-[#002f95]"></div>
          <p className="text-gray-400 text-sm font-medium">Loading your feed...</p>
        </div>
      ) : (
        <div className="space-y-5">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-gray-100">
              <div className="text-gray-300 mb-3 flex justify-center">
                <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h.008v.008H12V7.5zM12 12h.008v.008H12V12zm0 4.5h.008v.008H12v-.008zm-9-10.5h18m-18 6h18m-18 6h18" /></svg>
              </div>
              <p className="text-gray-500 font-medium">No posts to show right now.</p>
              <p className="text-gray-400 text-sm">Be the first to share something!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}