import { useEffect, useState } from "react";
import { getProfileAPI, getUserPostsAPI } from "../services/api";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import toast from "react-hot-toast";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);

  // Fetch profile data
  const fetchProfileData = async () => {
    try {
      const data = await getProfileAPI();
      setProfile(data.user);

      // Fetch user's posts using user._id
      if (data.user?._id) {
        const postsData = await getUserPostsAPI(data.user._id);
        setPosts(postsData);
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading) return <Loader />;

  if (!profile) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Profile not found</h3>
        <p className="text-gray-500">Unable to load profile information</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Cover Photo Placeholder */}
        <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Profile Picture */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg -mt-16">
                {profile.name?.charAt(0).toUpperCase()}
              </div>
              
              {/* Profile Details */}
              <div className="sm:pb-2">
                <h1 className="text-3xl font-bold text-gray-800 mb-1">{profile.name}</h1>
                <p className="text-gray-600 mb-2 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <span>{profile.email}</span>
                </p>
                {profile.bio && (
                  <p className="text-gray-700 max-w-2xl">{profile.bio}</p>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3 mt-4 sm:mt-0">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Edit Profile
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200">
                More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600 mb-1">{posts.length}</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600 mb-1">0</div>
            <div className="text-sm text-gray-600">Connections</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600 mb-1">0</div>
            <div className="text-sm text-gray-600">Profile Views</div>
          </div>
        </div>
      </div>

      {/* User's Posts */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">Posts by {profile.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{posts.length} posts</span>
          </div>
        </div>

        {postsLoading ? (
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
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h3>
            <p className="text-gray-500">Start sharing your thoughts with the community!</p>
          </div>
        )}
      </div>
    </div>
  );
}
