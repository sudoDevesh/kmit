
# kmit 🚀

**kmit** is a Git automation CLI that helps developers work faster by suggesting smart branch names, generating meaningful commit messages, and streamlining everyday Git workflows through an interactive terminal experience.

---

## ✨ Why kmit?

Writing good commit messages and following consistent branch naming is often repetitive and error‑prone. **kmit** automates these steps so you can focus on coding instead of Git rituals.

---

## 🔑 Keywords Explained

These keywords help developers discover **kmit** on npm and understand its purpose:

* **git** – Works directly with Git repositories
* **commit** – Helps generate and manage commit messages
* **cli** – Command Line Interface tool
* **automation** – Automates repetitive Git tasks

---

## 📦 Prerequisites

Before using **kmit**, ensure you have:

* **Node.js ≥ 18**
* **Git** installed and configured
* An existing **Git repository**
* **GitHub Copilot** installed and **logged in** (used for intelligent commit message suggestions)

Check versions:

```bash
node -v
git --version
```

---

## 📥 Installation


Install globally from npm:

```bash
npm install -g kmmit
```


Verify installation:

```bash
kmit --help
```

---

## 🛠 How It Works

1. **Detects Git Context**
   kmit checks the current repository, branch status, and staged files using `simple-git`.

2. **Interactive Prompts**
   Uses `inquirer` to ask questions like:

   * What are you working on?
   * Type of change (feat, fix, chore, etc.)
   * Scope or ticket reference

3. **Smart Suggestions**
   Based on your inputs and staged changes, kmit suggests:

   * Clean branch names
   * Well‑structured commit messages

4. **Developer in Control**
   You can **select, edit, or reject** suggestions before committing.

5. **Executes Git Commands**
   Once confirmed, kmit runs the appropriate Git commands for you.

---

## ▶️ Usage


Run kmit inside a Git repository:

```bash
kmit run
```

Typical flow:

* Choose operation (commit / branch / helper)
* Review suggested messages
* Confirm to execute Git commands

---

## 🧪 Development

Run locally in dev mode:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 📄 License

MIT License © 2025

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

---

## 🌟 Roadmap (Planned)

* GitHub Copilot / AI commit suggestions
* Conventional Commits enforcement
* Config file support (.kmitrc)
* Git hooks integration

---

Happy committing with **kmit** 🎉
