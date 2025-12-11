import chalk from "chalk";
import { ensureBranch, addAll, pushCurrentBranch, getStagedFiles } from "../gitHelper";
import { commitStagedFiles } from "../commitHelper";

export async function runCommand(): Promise<void> {
  console.log(chalk.blue("📌 Ensuring branch is safe..."));
  const branch = await ensureBranch();
  console.log(chalk.blue(`📌 Using branch: ${branch}`));

  console.log(chalk.blue("📌 Adding all changes..."));
  await addAll();

  // After adding, get staged files again
  const stagedFiles = await getStagedFiles();
  if (!stagedFiles.length) {
    console.log(chalk.yellow("⚠ No changes detected to commit."));
    return;
  }

  console.log(chalk.blue("📝 Generating commit message..."));
  await commitStagedFiles();

  console.log(chalk.blue("🚀 Pushing changes..."));
  await pushCurrentBranch();

  console.log(chalk.green("🎉 All done!"));
}
