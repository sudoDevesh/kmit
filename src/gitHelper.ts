import simpleGit, { SimpleGit } from "simple-git";
import inquirer from "inquirer";
import chalk from "chalk";
import { spawnSync } from "child_process";

export const git: SimpleGit = simpleGit();

export async function getCurrentBranch(): Promise<string> {
  const branchSummary = await git.branch();
  return branchSummary.current;
}

export async function getStagedFiles(): Promise<string[]> {
  const status = await git.status();
  return status.staged;
}

export function generateBranchNamesWithCopilot(files: string[]): string[] {
  const filesSummary = files.join(", ");
  const prompt = `You are a git branch assistant. Suggest 5 concise, conventional branch names based on the following staged files/changes: ${filesSummary} Use types like feat, fix, chore, docs, refactor. Only output the messages, do not add extra explanation. `;
  const promptArg = JSON.stringify(prompt);
  const r = spawnSync("copilot", ["-p", promptArg, "--model", "gpt-5-mini"], {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
    shell: true,
  });
  if (r.error || r.status !== 0) {
    console.error(chalk.red("Error calling Copilot CLI:"), r.stderr || r.error);
    process.exit(1);
  }
  console.log(chalk.gray("\nRaw Copilot output:\n"), r.stdout);
  return (r.stdout || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(l => l && /^[a-z]+\/[a-z0-9\-]+$/i.test(l))
    .slice(0, 5);
}

export async function suggestBranchName(stagedFiles: string[]): Promise<string> {
  const copilotBranches = generateBranchNamesWithCopilot(stagedFiles);
  const { branch } = await inquirer.prompt([
    {
      type: "list",
      name: "branch",
      message: "Select a branch name to continue:",
      choices: [...copilotBranches, "Write my own branch name"],
    },
  ]);

  let finalBranch = branch;
  if (branch === "Write my own branch name") {
    const { custom } = await inquirer.prompt([
      { type: "input", name: "custom", message: "Enter branch name:" },
    ]);
    finalBranch = custom;
  }

  return finalBranch;
}

export async function ensureBranch(): Promise<string> {
  let current = await getCurrentBranch();

  if (["main", "master"].includes(current)) {
    console.log(chalk.yellow("⚠ You are on main/master branch. You need a feature branch."));

    const stagedFiles = await getStagedFiles();
    const finalBranch = await suggestBranchName(stagedFiles);

    await createOrCheckoutBranch(finalBranch);
    current = finalBranch;
  }

  return current;
}

export async function createOrCheckoutBranch(branchName: string): Promise<void> {
  const branches = await git.branch();
  if (branches.all.includes(branchName)) {
    await git.checkout(branchName);
    console.log(chalk.green(`✔ Checked out existing branch: ${branchName}`));
  } else {
    await git.checkoutLocalBranch(branchName);
    console.log(chalk.green(`✔ Created and switched to new branch: ${branchName}`));
  }
}

export async function addAll(): Promise<void> {
  await git.add(".");
}

export async function pushCurrentBranch(): Promise<void> {
  const branch = await getCurrentBranch();
  await git.push("origin", branch);
}
