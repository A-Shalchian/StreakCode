import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Get the current session
    const session = await getAuthSession();

    // Check if the user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to update your GitHub username" },
        { status: 401 }
      );
    }

    // Parse the request body
    const { username } = await request.json();

    // Validate the username
    if (!username) {
      return NextResponse.json(
        { error: "GitHub username is required" },
        { status: 400 }
      );
    }

    // Update the user's GitHub username in the database
    await prisma.user.update({
      where: { id: session.user.id },
      data: { githubUsername: username },
    });

    return NextResponse.json(
      { message: "GitHub username updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating GitHub username:", error);
    return NextResponse.json(
      { error: "Something went wrong updating your GitHub username" },
      { status: 500 }
    );
  }
}
