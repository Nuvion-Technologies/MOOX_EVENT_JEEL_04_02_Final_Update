import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { Trophy, Upload, CheckCircle, XCircle, Plus, ImagePlus, Calendar, Loader } from 'lucide-react';

const AchievementsManagement = () => {
    const ip = import.meta.env.VITE_IP;

    const [achievements, setAchievements] = useState([]);
    const [newAchievement, setNewAchievement] = useState({
        title: '',
        description: '',
        achievement_date: '',
        photo: null,
    });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [notification, setNotification] = useState("");

    const compressImage = async (file) => {
        if (!file) return null;

        const options = {
            maxSizeMB: 0.25, // 50KB = 0.05MB
            maxWidthOrHeight: 1024,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            // Convert to File object with original name and type
            return new File([compressedFile], file.name, { type: file.type });
        } catch (error) {
            console.error("Error compressing image:", error);
            setError("Failed to compress image. Please try again.");
            setTimeout(() => setError(""), 2000);
            return null;
        }
    };

    const fetchAchievements = async () => {
        try {
            const user_id = localStorage.getItem('userid');
            if (!user_id) {
                setError('User not authenticated.');
                setTimeout(() => setError(""), 2000);
                return;
            }
            const { data } = await axios.post(`${ip}/moox_events/api/achievements/get-achievements`, { user_id });
            setAchievements(data.events);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching achievements:', error);
            setError('Failed to load achievements');
            setTimeout(() => setError(""), 2000);
            setLoading(false);  
        }
    };

    console.log(achievements);

    const handleAddAchievement = async (e) => {
        e.preventDefault();
      
        const user_id = localStorage.getItem("userid");
        if (!user_id) {
          setError("User not authenticated.");
          setTimeout(() => setError(""), 2000);
          return;
        }
      
        if (!newAchievement.photo) {
          setError("Please upload a photo.");
          setTimeout(() => setError(""), 2000);
          return;
        }
      
        try {
          // Prepare FormData
          const data = new FormData();
          data.append("title", newAchievement.title);
          data.append("description", newAchievement.description);
          data.append("achievement_date", newAchievement.achievement_date);
          data.append("photo", newAchievement.photo);
          data.append("user_id", user_id);
      
          const response = await axios.post(
            `${ip}/moox_events/api/achievements/add-achievements`,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
      
          // Handle success
          fetchAchievements();
          setNotification(response.data.message || "Achievement added successfully!");
          setTimeout(() => setNotification(""), 2000);
          setNewAchievement({
            title: "",
            description: "",
            achievement_date: "",
            photo: null,
          });
          setPreviewImage(null);
          setIsFormVisible(false);
          window.location.reload();
        } catch (error) {
          console.error("Error adding achievement:", error);
          setError(
            "Failed to add achievement. " +
              (error.response?.data?.message || error.message)
          );
          setTimeout(() => setError(""), 2000);
        }
    };

    const handleToggleStatus = async (id, status) => {
        try {
            const user_id = localStorage.getItem('userid');
            if (!user_id) {
                setError('User not authenticated.');
                setTimeout(() => setError(""), 2000);
                return;
            }
            await axios.post(`${ip}/moox_events/api/achievements/change-achievements-status`, { event_id: id, status: !status, user_id });
            fetchAchievements();
            setNotification(`Achievement ${!status ? 'activated' : 'deactivated'} successfully`);
            setTimeout(() => setNotification(""), 2000);
        } catch (error) {
            console.error('Error toggling achievement status:', error);
            setError('Failed to update achievement status');
            setTimeout(() => setError(""), 2000);
        }
    };

    useEffect(() => {
        fetchAchievements();
    }, []);

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Compress the image if needed
                const processedFile = await compressImage(file);
                if (processedFile) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setPreviewImage(reader.result);
                        setNewAchievement({ ...newAchievement, photo: processedFile});
                    };
                    reader.readAsDataURL(processedFile);
                }
            } catch (error) {
                console.error("Error processing image:", error);
                setError("Failed to process image");
                setTimeout(() => setError(""), 2000);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#FDF8DA] p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-[#1a2a47] rounded-2xl p-6 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#d6af53]/10"></div>
                    <div className="relative">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Achievements Management
                        </h2>
                        <p className="text-[#d6af53] font-medium">
                            Showcase and manage your milestones
                        </p>
                    </div>
                </div>

                {/* Toggle Form Button */}
                <button
                    onClick={() => setIsFormVisible(true)}
                    className="mb-8 bg-[#1a2a47] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#d6af53] focus:outline-none focus:ring-2 focus:ring-[#d6af53] focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                    <Plus className="w-5 h-5" />
                    Add New Achievement
                </button>

                {/* Modal Overlay */}
                {isFormVisible && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        {/* Modal Content */}
                        <div className="bg-white rounded-2xl shadow-xl border border-[#d6af53]/20 overflow-hidden w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6 sm:p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-semibold text-[#1a2a47]">
                                        Add New Achievement
                                    </h3>
                                </div>
                                <form onSubmit={handleAddAchievement} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-[#1a2a47] mb-2">
                                                Achievement Title
                                            </label>
                                            <input
                                                type="text"
                                                value={newAchievement.title}
                                                onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 border border-[#d6af53]/30 rounded-lg focus:ring-2 focus:ring-[#d6af53] focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white"
                                                placeholder="Enter achievement title"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-[#1a2a47] mb-2">
                                                Achievement Date
                                            </label>
                                            <input
                                                type="date"
                                                value={newAchievement.achievement_date}
                                                onChange={(e) => setNewAchievement({ ...newAchievement, achievement_date: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 border border-[#d6af53]/30 rounded-lg focus:ring-2 focus:ring-[#d6af53] focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-[#1a2a47] mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                value={newAchievement.description}
                                                onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                                                required
                                                rows="4"
                                                className="w-full px-4 py-3 border border-[#d6af53]/30 rounded-lg focus:ring-2 focus:ring-[#d6af53] focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white"
                                                placeholder="Enter achievement description"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-[#1a2a47] mb-2">
                                                Achievement Photo
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handlePhotoChange}
                                                    required
                                                    className="hidden"
                                                    id="achievement-photo"
                                                />
                                                <label
                                                    htmlFor="achievement-photo"
                                                    className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-[#d6af53]/30 rounded-lg  hover:border-[#d6af53] transition-all duration-200"
                                                >
                                                    {previewImage ? (
                                                        <div className="relative w-full aspect-video">
                                                            <img
                                                                src={previewImage}
                                                                alt="Preview"
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                                                <ImagePlus className="w-8 h-8 text-white" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center py-4">
                                                            <Upload className="w-8 h-8 text-[#d6af53] mb-2" />
                                                            <span className="text-sm text-gray-600">
                                                                Click to upload photo
                                                            </span>
                                                        </div>
                                                    )}
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-[#1a2a47] text-white py-3.5 px-4 rounded-lg font-semibold hover:bg-[#d6af53] focus:outline-none focus:ring-2 focus:ring-[#d6af53] focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                        >
                                            <Trophy className="w-5 h-5" />
                                            Add Achievement
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsFormVisible(false)}
                                            className="flex-1 bg-gray-200 text-gray-800 py-3.5 px-4 rounded-lg font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02]"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Achievements Grid */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader className="w-8 h-8 text-[#1a2a47] animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {achievements.map((achievement) => (
                            <div
                                key={achievement._id}
                                className="group relative h-[400px] bg-white rounded-2xl shadow-xl border border-[#d6af53]/10 overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-[#d6af53]/30"
                            >
                                <img
                                    src={`${ip}/achievements/${achievement.photo}`}
                                    alt={achievement.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                {/* Status Badge */}
                                <div
                                    className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm ${
                                        achievement.active
                                            ? "bg-green-500/90 text-white"
                                            : "bg-red-500/90 text-white"
                                    }`}
                                >
                                    {achievement.active ? "Active" : "Inactive"}
                                </div>

                                {/* Achievement Content */}
                                <div className="absolute bottom-20 left-6 right-6">
                                    <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-2">
                                        {achievement.title}
                                    </h3>
                                    <p className="text-white/90 line-clamp-2 text-md mb-2">
                                        {achievement.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-white/80">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm">
                                            {new Date(achievement.event_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="absolute bottom-6 right-6">
                                    <button
                                        onClick={() => handleToggleStatus(achievement._id, achievement.active)}
                                        className={`flex items-center gap-2 px-4 h-10 rounded-full transition-all duration-300 ${
                                            achievement.active
                                                ? "bg-[#1a2a47]/80 text-white hover:bg-[#d6af53]"
                                                : "bg-[#d6af53]/80 text-white hover:bg-[#1a2a47]"
                                        }`}
                                    >
                                        {achievement.active ? (
                                            <>
                                                <XCircle className="w-5 h-5" />
                                                <span>Deactivate</span>
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-5 h-5" />
                                                <span>Activate</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Floating Notification */}
            {notification && (
                <div className="fixed bottom-4 right-4 bg-[#1a2a47] text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-fade-in">
                    {notification}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-fade-in">
                    {error}
                </div>
            )}
        </div>
    );
};

export default AchievementsManagement;