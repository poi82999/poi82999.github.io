// Regenerates data/projects.json from the poi82999 GitHub account's public repo activity.
// Run manually with `node scripts/generate.mjs`, or via the update-portfolio Actions workflow.

const USER = process.env.GH_USER || 'poi82999';
const TOKEN = process.env.GITHUB_TOKEN;

const headers = {
  'User-Agent': 'poi82999-portfolio-generator',
  Accept: 'application/vnd.github+json',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

async function ghFetch(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${path} -> ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  const repos = (await ghFetch(`/users/${USER}/repos?type=owner&sort=pushed&direction=desc&per_page=100`))
    .filter((r) => !r.fork && !r.archived);

  const projects = [];
  for (const r of repos) {
    let lastCommitMessage = null;
    try {
      const commits = await ghFetch(`/repos/${USER}/${r.name}/commits?per_page=1`);
      lastCommitMessage = commits[0]?.commit?.message?.split('\n')[0] ?? null;
    } catch {
      // repo may be empty; skip commit lookup
    }
    projects.push({
      name: r.name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage || null,
      language: r.language,
      pushedAt: r.pushed_at,
      lastCommitMessage,
    });
  }

  const output = { generatedAt: new Date().toISOString(), projects };
  await import('node:fs/promises').then((fs) =>
    fs.writeFile('data/projects.json', JSON.stringify(output, null, 2) + '\n')
  );
  console.log(`Wrote ${projects.length} project(s) to data/projects.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
