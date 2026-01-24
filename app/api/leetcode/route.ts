import { NextResponse } from "next/server"

export async function GET() {
  const username = process.env.NEXT_PUBLIC_LEETCODE_USERNAME

  if (!username) {
    return NextResponse.json({ error: "Username missing" }, { status: 400 })
  }

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://leetcode.com",
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              submissionCalendar
            }
          }
        `,
        variables: { username },
      }),
    })

    const json = await res.json()
    const user = json.data.matchedUser

    const stats = user.submitStats.acSubmissionNum
    const calendar = JSON.parse(user.submissionCalendar)

    return NextResponse.json({
      easy: stats.find((d: any) => d.difficulty === "Easy")?.count || 0,
      medium: stats.find((d: any) => d.difficulty === "Medium")?.count || 0,
      hard: stats.find((d: any) => d.difficulty === "Hard")?.count || 0,
      calendar,
    })
  } catch {
    return NextResponse.json({ error: "LeetCode fetch failed" }, { status: 500 })
  }
}
