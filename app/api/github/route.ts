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
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query ($login: String!) {
            user(login: $login) {
              followers {
                totalCount
              }
              repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
                nodes {
                  name
                  url
                  stargazerCount
                  primaryLanguage {
                    name
                  }
                  pushedAt
                }
              }
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { login: username },
      }),
    })

    const json = await res.json()

    if (!json.data?.user) {
      throw new Error("Invalid GraphQL response")
    }

    const user = json.data.user

    // ⭐ Top repos
    const repos = user.repositories.nodes

    const topRepos = [...repos]
      .sort((a: any, b: any) => b.stargazerCount - a.stargazerCount)
      .slice(0, 5)
      .map((r: any) => ({
        name: r.name,
        stars: r.stargazerCount,
        language: r.primaryLanguage?.name || "N/A",
        url: r.url,
      }))

    const recentRepos = repos.slice(0, 5).map((r: any) => ({
      name: r.name,
      url: r.url,
      updatedAt: r.pushedAt,
    }))

    // 📊 REAL contributions
    const daily: Record<string, number> = {}
    const monthly: Record<string, number> = {}

    user.contributionsCollection.contributionCalendar.weeks.forEach(
      (week: any) => {
        week.contributionDays.forEach((day: any) => {
          daily[day.date] = day.contributionCount

          const d = new Date(day.date)
          const monthKey = `${d.getFullYear()}-${d.getMonth()}`
          monthly[monthKey] =
            (monthly[monthKey] || 0) + day.contributionCount
        })
      }
    )

    return NextResponse.json({
      followers: user.followers.totalCount,
      publicRepos: repos.length,
      topRepos,
      recentRepos,
      dailyCommits: daily,
      monthlyCommits: monthly,
    })
  } catch (err: any) {
    console.error("GitHub GraphQL ERROR:", err.message)
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 }
    )
  }
}
