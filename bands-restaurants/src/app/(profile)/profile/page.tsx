"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

// Extending the UserResource type to include publicMetadata
interface CustomUserResource {
  publicMetadata?: {
    profileType?: "band" | "gigProvider";
  };
  update: (data: {
    publicMetadata?: { profileType?: "band" | "gigProvider" };
  }) => Promise<CustomUserResource>;
}

const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const [profileType, setProfileType] = useState<string>("");

  useEffect(() => {
    // Ensure that user is loaded and publicMetadata exists
    if (user) {
      const customUser = user as CustomUserResource; // Cast user to the extended type
      if (customUser.publicMetadata) {
        setProfileType(customUser.publicMetadata.profileType || "");
      }
    }
  }, [user]);

  const handleProfileTypeChange = async (type: "band" | "gigProvider") => {
    if (user) {
      try {
        // Safely update the profile type in Clerk's public metadata
        const customUser = user as CustomUserResource; // Cast user to the extended type
        await customUser.update({
          publicMetadata: { profileType: type },
        });
        setProfileType(type);
      } catch (error) {
        console.error("Failed to update profile type", error);
        // Optionally add error handling (e.g., show error message to user)
      }
    }
  };

  if (!isLoaded || !user) return <div>Loading...</div>;

  return (
    <div>
      {profileType ? (
        <div>Your profile is set as a {profileType}</div>
      ) : (
        <div>
          <p>Choose your profile type:</p>
          <button onClick={() => handleProfileTypeChange("band")}>Band</button>
          <button onClick={() => handleProfileTypeChange("gigProvider")}>
            Gig Provider
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
