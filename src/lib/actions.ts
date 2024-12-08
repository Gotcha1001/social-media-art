"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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

export const switchLike = async (postId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not Authenticated");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
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
          postId,
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
    const likes = await prisma.like.findMany({ where: { postId } });
    return likes.map((like) => like.userId);
  } catch (error) {
    throw new Error("Failed to fetch likes");
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
