/**
 * GitHub API Integration
 * Fetches user statistics and repository data
 * Configure: Set NEXT_PUBLIC_GITHUB_USERNAME in your environment variables
 */

interface GitHubUser {
  login: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

interface GitHubRepo {
  name: string
  description: string
  url: string
  stargazers_count: number
  language: string
  topics: string[]
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    if (!response.ok) return null
    return response.json()
  } catch (error) {
    console.error("Failed to fetch GitHub user:", error)
    return null
  }
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=stars&order=desc`)
    if (!response.ok) return []
    return response.json()
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error)
    return []
  }
}

export async function fetchGitHubCommits(username: string, repoName: string): Promise<number> {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits?per_page=1`)
    if (!response.ok) return 0

    const link = response.headers.get("link")
    if (link) {
      const match = link.match(/&page=(\d+)>; rel="last"/)
      return match ? Number.parseInt(match[1]) : 1
    }
    return 1
  } catch (error) {
    console.error("Failed to fetch commit count:", error)
    return 0
  }
}

export async function fetchGitHubStats(username: string) {
  const user = await fetchGitHubUser(username)
  const repos = await fetchGitHubRepos(username)

  // Calculate total commits from top repos
  let totalCommits = 0
  for (const repo of repos.slice(0, 10)) {
    const commits = await fetchGitHubCommits(username, repo.name)
    totalCommits += commits
  }

  return {
    user,
    repos: repos.slice(0, 10),
    totalCommits,
    totalStars: repos.reduce((acc, repo) => acc + repo.stargazers_count, 0),
  }
}
