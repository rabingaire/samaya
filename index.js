#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const shell = require("shelljs");
const pkg = require("./package.json");
const updateNotifier = require("update-notifier");
const distanceInWordsToNow = require("date-fns/distance_in_words_to_now");

updateNotifier({ pkg }).notify();
shell.config.silent = true;
shell.exec("git log -1 --pretty=format:%cd", function(code, stdout, stderr) {
  if (code === 0) {
    console.log(`
      ${chalk.green.bold("⏰ Time Taken:")} ${chalk.green(
      distanceInWordsToNow(stdout)
    )}\n`);
  } else {
    console.log(`
      ${chalk.red.bold("❌ ERROR:")} ${chalk.red(stderr)}`);
  }
});
