import { NextResponse } from "next/server"

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME
  const token = process.env.GITHUB_TOKEN

  if (!username || !token) {
    return NextResponse.json(
      { error: "GitHub username or token missing" },
      { status: 400 }
    )
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
        },
      }
    )

    if (!res.ok) {
      const err = await res.text()
      throw new Error(err)
    }

    const repos = await res.json()

    if (!Array.isArray(repos)) {
      throw new Error("Invalid repos response")
    }

    const projects = repos.map((repo: any) => ({
      name: repo.name,
      description: repo.description || "No description",
      language: repo.language || "N/A",
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
      url: repo.html_url,
    }))

    return NextResponse.json({ projects })
  } catch (err: any) {
    console.error("GitHub Repos API Error:", err.message)
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    )
  }
}
