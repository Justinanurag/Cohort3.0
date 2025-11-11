import { Share2, Plus, Search, Filter, TrendingUp, Youtube, Twitter, Grid, List, X } from "lucide-react";
import { Card } from "../components/card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useState, useMemo } from "react";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "youtube" | "twitter">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();
  const contents = useContent();
  const BASE_URL = import.meta.env.VITE_BASEURL;

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/signin");
  }

  // Calculate statistics
  const stats = useMemo(() => {
    const total = contents.length;
    const youtube = contents.filter(c => c.type === "youtube").length;
    const twitter = contents.filter(c => c.type === "twitter").length;
    return { total, youtube, twitter };
  }, [contents]);

  // Filter and sort content
  const filteredAndSortedContents = useMemo(() => {
    let filtered = contents;

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter(c => c.type === filterType);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.link.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return sorted;
  }, [contents, filterType, searchQuery, sortBy]);

  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/shareLink`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );

      const shareUrl = `${window.location.origin}/shareLink/${response.data.hash}`;
      console.log("Generated share URL:", shareUrl);

      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);

      Swal.fire({
        icon: "success",
        title: "Link Copied!",
        text: "Share link has been copied to clipboard.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error: any) {
      console.error("Error creating share link:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create share link",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30">
      <Sidebar />
      <div className="flex-1 ml-72 flex flex-col p-6 sm:p-8 lg:p-12 transition-all duration-300">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Knowledge Base</h1>
              <p className="text-gray-600">Organize and access your saved content</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="Grid View"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="List View"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp size={24} className="opacity-80" />
                <span className="text-2xl font-bold">{stats.total}</span>
              </div>
              <p className="text-sm opacity-90">Total Content</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Youtube size={24} className="opacity-80" />
                <span className="text-2xl font-bold">{stats.youtube}</span>
              </div>
              <p className="text-sm opacity-90">YouTube Videos</p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Twitter size={24} className="opacity-80" />
                <span className="text-2xl font-bold">{stats.twitter}</span>
              </div>
              <p className="text-sm opacity-90">Twitter Posts</p>
            </div>
            <div className="bg-white rounded-xl p-5 border-2 border-gray-200 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Share2 size={20} className="text-indigo-600" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{filteredAndSortedContents.length}</span>
              </div>
              <p className="text-sm text-gray-600">Filtered Results</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title or link..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Filter by Type */}
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as "all" | "youtube" | "twitter")}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="youtube">YouTube</option>
                  <option value="twitter">Twitter</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "title")}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Sort by Title</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              <span>Add Content</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-white text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200"
            >
              <Share2 size={20} />
              <span>Share Collection</span>
            </button>
          </div>
        </div>

        {/* Content Display */}
        {contents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
              <Plus size={40} className="text-indigo-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No content yet</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Start building your knowledge base by adding your first piece of content
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus size={20} />
              <span>Add Your First Content</span>
            </button>
          </div>
        ) : filteredAndSortedContents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
              <Search size={40} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterType("all");
              }}
              className="flex items-center gap-2 bg-white text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-md border border-gray-200"
            >
              <X size={20} />
              <span>Clear Filters</span>
            </button>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full"
            : "flex flex-col gap-4 w-full"
          }>
            {filteredAndSortedContents.map(({ type, link, title }, index) => (
              <div 
                key={`${type}-${index}`} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Card
                  type={type}
                  link={link}
                  title={title}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
