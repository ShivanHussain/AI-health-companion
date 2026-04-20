import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";
import axios from "axios";

const Profile = () => {
    const { user, updateUser } = useAuth();

    const [activeTab, setActiveTab] = useState("info");
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || "");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [success, setSuccess] = useState(false);

    const getInitials = (fullName) => {
        return fullName
            .trim()
            .split(" ")
            .filter(Boolean)
            .map((w) => w[0].toUpperCase())
            .slice(0, 2)
            .join("");
    };


    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("User not authenticated");
                return;
            }

            // password validation
            if (newPassword && newPassword !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const payload = {
                name,
                email,
                age,
                gender,
            };

            if (newPassword) {
                payload.password = newPassword;
                payload.currentPassword = currentPassword;
            }

            // Update profile
            await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/update`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Get fresh updated user
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update state + localStorage
            updateUser(data);
            localStorage.setItem("user", JSON.stringify(data));

            setSuccess(true);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.error("Update Error:", error);
            alert(error?.response?.data?.message || "Update failed");
        }
    };
    return (
        <div className="profile-page">
            <div className="profile-card">

                <div className="profile-header">
                    <span className="profile-badge">Active</span>

                    <div className="profile-header-row">

                        <div className="profile-avatar-ring">
                            <span className="profile-avatar-initials">
                                {getInitials(name || "User")}
                            </span>
                        </div>


                        <div className="profile-user-info">
                            <h2 className="profile-display-name">
                                {name || "Your Name"}
                            </h2>
                            <p className="profile-display-email">
                                {email || "your@email.com"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="profile-body">

                    {/* Tabs */}
                    <div className="profile-tabs">
                        <button
                            className={`profile-tab ${activeTab === "info" ? "active" : ""}`}
                            onClick={() => setActiveTab("info")}
                        >
                            Personal Info
                        </button>

                        <button
                            className={`profile-tab ${activeTab === "security" ? "active" : ""}`}
                            onClick={() => setActiveTab("security")}
                        >
                            Security
                        </button>
                    </div>

                    {/* Personal Info */}
                    {activeTab === "info" && (
                        <div className="profile-panel">

                            <p className="profile-section-label">Account Details</p>

                            {/* Name */}
                            <div className="profile-field">
                                <label className="profile-label">Full name</label>
                                <input
                                    className="profile-input"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/* Email */}
                            <div className="profile-field">
                                <label className="profile-label">Email</label>
                                <input
                                    className="profile-input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Age */}
                            <div className="profile-field">
                                <label className="profile-label">Age</label>
                                <input
                                    className="profile-input"
                                    type="number"
                                    value={age}
                                    placeholder="Enter age"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>

                            {/* Gender */}
                            <div className="profile-field">
                                <label className="profile-label">Gender</label>
                                <select
                                    className="profile-input"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                        </div>
                    )}

                    {/* Security */}
                    {activeTab === "security" && (
                        <div className="profile-panel">

                            <p className="profile-section-label">Change Password</p>

                            <div className="profile-field">
                                <label className="profile-label">Current Password</label>
                                <input
                                    className="profile-input"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>

                            <div className="profile-field">
                                <label className="profile-label">New Password</label>
                                <input
                                    className="profile-input"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            <div className="profile-field">
                                <label className="profile-label">Confirm Password</label>
                                <input
                                    className="profile-input"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                        </div>
                    )}

                    <div className="profile-divider" />

                    <button className="profile-btn" onClick={handleUpdate}>
                        Save Changes
                    </button>

                    {success && (
                        <div className="profile-success">
                            Profile updated successfully
                        </div>
                    )}

                </div>
            </div>
            
        </div>
    );
};

export default Profile;