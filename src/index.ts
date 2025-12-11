#!/usr/bin/env node

import { program } from "commander";
import { checkCommand } from "./commands/check";
import { runCommand } from "./commands/run";

program
  .name("kmit")
  .description("CLI tool for automated git commits and push")
  .version("1.0.0");

program
  .command("check")
  .description("Check current branch")
  .action(checkCommand);

program
  .command("run")
  .description("Run full workflow: add, commit, push")
  .action(runCommand);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);
