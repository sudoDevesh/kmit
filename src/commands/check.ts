import { getCurrentBranch, getStagedFiles, suggestBranchName, createOrCheckoutBranch } from "../gitHelper";
import inquirer from "inquirer";
import chalk from "chalk";

export async function checkCommand(): Promise<void> {
  let current = await getCurrentBranch();

  if (["main", "master"].includes(current)) {
    console.log(chalk.yellow("⚠ You are on main/master branch. You need a feature branch."));

    const stagedFiles = await getStagedFiles();
    const suggestedBranch = await suggestBranchName(stagedFiles);

    const { branch } = await inquirer.prompt([
      {
        type: "list",
        name: "branch",
        message: "Select a branch name to continue:",
        choices: [suggestedBranch, "Write my own branch name"]
      }
    ]);

    let finalBranch = branch;
    if (branch === "Write my own branch name") {
      const { custom } = await inquirer.prompt([
        { type: "input", name: "custom", message: "Enter branch name:" }
      ]);
      finalBranch = custom;
    }

    await createOrCheckoutBranch(finalBranch);
    current = finalBranch;
  }

  console.log(chalk.green(`✅ Current branch is safe: ${current}`));
}
