"use server";

import { auth, getAuth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated...");
  }

  try {
    //first check the existing follower
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });
    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });
      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wong!");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });
    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });
    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const updateProfile = async (payload: {
  formData: FormData;
  cover?: string;
}) => {
  const { formData, cover } = payload;
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    cover: z.string().optional(),
    name: z
      .string()
      .max(60, { message: "Name cannot exceed 60 characters" })
      .optional(),
    surname: z
      .string()
      .max(60, { message: "Surname cannot exceed 60 characters" })
      .optional(),
    description: z
      .string()
      .max(300, { message: "Description cannot exceed 300 characters" })
      .optional(),
    city: z
      .string()
      .max(60, { message: "City cannot exceed 60 characters" })
      .optional(),
    school: z
      .string()
      .max(60, { message: "School cannot exceed 60 characters" })
      .optional(),
    work: z
      .string()
      .max(60, { message: "Work cannot exceed 60 characters" })
      .optional(),
    website: z
      .string()
      .max(60, { message: "Website cannot exceed 60 characters" })
      .optional(),
  });

  const validateFields = Profile.safeParse({ cover, ...filteredFields });

  if (!validateFields.success) {
    const errorMessages = validateFields.error.flatten().fieldErrors;
    console.error(errorMessages);
    throw new Error(Object.values(errorMessages).flat().join(", "));
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: validateFields.data,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Database update failed");
  }
};

export const addComment = async (postId: string, desc: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not Authenticated");

  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        userId,
        postId,
      },
      include: {
        user: true,
      },
    });
    return createdComment;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const getCommentCount = async (postId: string) => {
  try {
    const count = await prisma.comment.count({
      where: { postId: postId }, // Use postId directly as a string
    });
    return count;
  } catch (error) {
    console.error("Failed to fetch comment count:", error);
    throw new Error("Failed to fetch comment count");
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const desc = formData.get("desc") as string;

  const Desc = z.string().min(1).max(255);

  const validatedDesc = Desc.safeParse(desc);

  if (!validatedDesc.success) {
    console.log("Description is not validated");
    return;
  }

  const { userId } = await auth();

  if (!userId) throw new Error("User is not Authenticated");

  try {
    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId,
        img,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};

export const addStory = async (img: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not Authenticated");

  try {
    // Check if the user already has 10 or more stories
    const storyCount = await prisma.story.count({
      where: {
        userId,
      },
    });

    if (storyCount >= 10) {
      throw new Error("User cannot post more than 10 stories.");
    }

    // Proceed with creating the story if under the limit
    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to handle it upstream if needed
  }
};

export const deletePost = async (postId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not Authenticated");

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId,
      },
    });
    revalidatePath("/");
  } catch (error) {}
};

interface UserData {
  id: string;
  username?: string;
  name?: string;
  surname?: string;
  avatar?: string;
}

export const createUser = async (userData: UserData) => {
  if (!userData.id) {
    throw new Error("User ID is required");
  }

  try {
    // Check if a user already exists with the given ID
    const existingUser = await prisma.user.findUnique({
      where: { id: userData.id },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser; // Optionally return the existing user or handle as needed
    }

    // Generate a unique username if not provided
    const username = userData.username || `user_${userData.id.slice(0, 8)}`;

    // Create a new user in the database
    return await prisma.user.create({
      data: {
        id: userData.id,
        username: username,
        name: userData.name,
        surname: userData.surname,
        avatar: userData.avatar || "/noAvatar.png",
        cover: "/noCover.png",
      },
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error("Failed to create user");
  }
};

export const getFriends = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  try {
    // Fetch friends where the logged-in user is the follower and the followed user is not blocked
    const friends = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
      include: {
        following: true, // Include the details of the followed user
      },
    });

    // Only return the following user details
    return friends.map((f) => f.following);
  } catch (error) {
    console.error("Failed to fetch friends:", error);
    throw new Error("Failed to fetch friends");
  }
};

export const fetchStories = async () => {
  const { userId } = await auth();

  // Check if the user is authenticated and handle accordingly
  if (!userId) {
    return []; // Return an empty array if the user is not authenticated
  }

  try {
    // Fetch all stories from the database
    const stories = await prisma.story.findMany({
      include: {
        user: true, // Include user details if needed
      },
    });

    return stories;
  } catch (error) {
    console.error("Failed to fetch stories:", error);
    throw new Error("Failed to fetch stories");
  }
};

// Toggle like for a comment
export const switchCommentLike = async (commentId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not Authenticated");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        commentId: commentId,
        userId,
      },
    });

    if (existingLike) {
      // Remove existing like
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      console.log("Comment like removed");
    } else {
      // Add new like
      await prisma.like.create({
        data: {
          commentId: commentId,
          userId,
        },
      });
      console.log("Comment like added");
    }
  } catch (error) {
    console.error("Error in switchCommentLike:", error);
    throw new Error("Something went wrong while toggling comment like");
  }
};

// Fetch likes for a specific comment
export const getCommentLikes = async (commentId: string) => {
  try {
    const likes = await prisma.like.findMany({
      where: { commentId: commentId },
    });
    return likes.map((like) => like.userId);
  } catch (error) {
    console.error("Error fetching comment likes:", error);
    throw new Error("Failed to fetch comment likes");
  }
};

export const switchLike = async (postId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not Authenticated");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: postId,
        userId,
      },
    });
    console.log("Existing Like:", existingLike); // Debugging
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      console.log("Like removed");
    } else {
      await prisma.like.create({
        data: {
          postId: postId,
          userId,
        },
      });
      console.log("Like added");
    }
  } catch (error) {
    console.error("Error in switchLike:", error);
    throw new Error("Something went wrong");
  }
};

export const getPostLikes = async (postId: string) => {
  try {
    const likes = await prisma.like.findMany({
      where: { postId: postId },
    });
    return likes.map((like) => like.userId);
  } catch (error) {
    throw new Error("Failed to fetch likes");
  }
};
// export const getAllCommentLikes = async (postId: string) => {
//   try {
//     const likes = await prisma.like.findMany({
//       where: { comment: { postId } },
//       select: {
//         commentId: true,
//         userId: true,
//       },
//     });

//     const groupedLikes = likes.reduce((acc, like) => {
//       const commentKey = like.commentId ?? "null"; // Use "null" as a placeholder key
//       if (!acc[commentKey]) {
//         acc[commentKey] = [];
//       }
//       acc[commentKey].push(like.userId);
//       return acc;
//     }, {} as Record<string, string[]>);

//     return groupedLikes;
//   } catch (error) {
//     console.error("Error fetching all comment likes:", error);
//     throw new Error("Failed to fetch all comment likes");
//   }
// };

export const getSuggestedFriends = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  try {
    // Fetch up to 20 friends that the user is not yet following
    const friends = await prisma.user.findMany({
      take: 20,
      where: {
        NOT: {
          followers: {
            some: {
              followerId: userId,
            },
          },
        },
      },
    });

    return friends;
  } catch (error) {
    console.error("Failed to fetch friend suggestions:", error);
    throw new Error("Failed to fetch friend suggestions");
  }
};

export async function addFriend(friendId: string, userId: string) {
  // First, check if both users are already following each other
  const existingFriendship = await prisma.follower.findFirst({
    where: {
      followerId: userId,
      followingId: friendId,
    },
  });

  // If users are already following each other, consider them friends
  if (existingFriendship) {
    // Return a message if they are already friends
    return {
      error: "You are already friends with this user.",
    };
  }

  // Create the friendship by adding a new following relationship in both directions
  await prisma.follower.create({
    data: {
      followerId: userId,
      followingId: friendId,
    },
  });

  await prisma.follower.create({
    data: {
      followerId: friendId,
      followingId: userId,
    },
  });

  return {
    success: "Friend added successfully.",
  };
}
