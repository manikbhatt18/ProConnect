import { useEffect, useState } from "react";
import { getPostsAPI, createPostAPI } from "../services/api";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const { user } = useAuth();

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPostsAPI();
        setPosts(res.posts || res);
      } catch (error) {
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Handle post create
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return toast.error("Post cannot be empty");
  
    try {
      const res = await createPostAPI({ content: newPost });
  
      // res is already the post object, so directly use res
      setPosts([res, ...posts]);
      setNewPost("");
      toast.success("Post created!");
    } catch {
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="space-y-8">
      {user && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <form onSubmit={handleCreatePost} className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="Share something with the community..."
                  className="w-full border-0 bg-gray-50 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none text-gray-700 placeholder-gray-500 transition-all duration-200"
                  rows="3"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                    disabled={!newPost.trim()}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h3>
          <p className="text-gray-500">Be the first to share something with the community!</p>
        </div>
      )}
    </div>
  );
}
