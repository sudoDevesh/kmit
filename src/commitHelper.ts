import { spawnSync } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";
import { git, getStagedFiles } from "./gitHelper";

export async function commitStagedFiles(): Promise<void> {
  const stagedFiles = await getStagedFiles();
  if (!stagedFiles.length) {
    console.log(
    chalk.yellow("No staged files. Stage files first with 'git add .'"));
    return;
  }
  const suggestions = generateCommitMessages(stagedFiles);
  const { selection } = await inquirer.prompt([
    {
      type: "list",
      name: "selection",
      message: "Choose a commit message:",
      choices: [...suggestions, "Write my own message"],
    },
  ]);

  let finalMsg = selection;
  if (selection === "Write my own message") {
    const { custom } = await inquirer.prompt([
      { type: "input", name: "custom", message: "Enter commit message:" },
    ]);
    finalMsg = custom;
  }

  await git.commit(finalMsg);
  console.log(chalk.green("✔ Commit created:"), finalMsg);
}

export function generateCommitMessages(files: string[]): string[] {
  console.log(files);
  const filesSummary = files.join(", ");
  const prompt = `You are a git commit assistant. Write 5 concise Conventional Commit messages (one per line) based on the following staged files: ${filesSummary} Use types like feat, fix, chore, docs, refactor. Only output the messages, do not add extra explanation. `;
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
    .filter(Boolean)
    .slice(0, 5);
}
