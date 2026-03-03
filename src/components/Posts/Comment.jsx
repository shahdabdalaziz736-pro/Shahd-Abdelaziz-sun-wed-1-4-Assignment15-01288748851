import { useEffect, useState } from 'react';
import { commentsAPI } from '../../api/endpoints';

export default function Comment({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    commentsAPI.getComments(postId)
      .then(res => {
        setComments(res.data.comments);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [postId]);

  if (loading) return <div className="p-4 text-center text-xs text-gray-400">Loading comments...</div>;

  return (
    <div className="bg-gray-50 p-4 rounded-b-xl border-t border-gray-100">
      <div className="space-y-4">
        {comments.length > 0 ? comments.map(c => (
          <div key={c._id} className="flex gap-2 items-start">
            <img src={c.user.image} className="w-8 h-8 rounded-full object-cover border" alt="" />
            <div className="flex flex-col">
              <div className="bg-gray-200 px-3 py-2 rounded-2xl text-[13px] shadow-sm">
                <p className="font-bold text-gray-900">{c.user.name}</p>
                <p className="text-gray-800">{c.content}</p>
              </div>
              <span className="text-[10px] text-gray-400 ml-2 mt-1">Just now</span>
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-400 text-xs">No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  );
}