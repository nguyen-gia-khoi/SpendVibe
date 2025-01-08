# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# 🗂️ **Expo File-based Routing**

Expo uses **file-based routing**, where the file structure determines the URL routing of the app. This simplifies navigation by automatically generating routes based on your file hierarchy.

- **Further Reading:** [📖 official Expo documentation on file-based routing](https://docs.expo.dev/develop/file-based-routing/).

##  **Branch Naming Convention**

### **Format**
- Use a prefix to indicate the type of work, followed by a brief, descriptive name.
- **Format:** `{type}/#<issue_number>-{description}`
  - `{type}`: Nature of the branch (e.g., feature, bug, hotfix, etc.).
  - `{description}`: A concise description of the task or issue.
  - `{#issue_number}`: Task number on Jira/Trello.

### **Examples:**

```bash
📂 git checkout -b feature/add-login-button
🐛 git checkout -b bug/fix-header-overlap
⚡ git checkout -b hotfix/critical-issue-123
```

### 📌 **Branch Type Reference**

| **Branch Type** | **Purpose**                                                 |
| --------------- | ----------------------------------------------------------- |
| **feature** ✨   | For adding new features or functionality.                   |
| **bug** 🐛       | For fixing bugs or issues.                                  |
| **hotfix** 🚑    | For critical fixes that must be resolved immediately.       |
| **release** 🚀   | For preparing a release with tested and finalized features. |
| **chore** 🧹     | For maintenance tasks such as dependency updates.           |
| **modify** 🛠️    | For minor adjustments, tweaks, or refactoring without new features.|


### **Commit Types:**
| **Type**     | **Description**                                                                     |
| ------------ | ----------------------------------------------------------------------------------- |
| **feat** ✨    | Introduces a new feature or functionality.                                          |
| **fix** 🐛     | Fixes a bug in the application.                                                     |
| **docs** 📚   | Documentation updates or improvements (e.g., README, comments, etc.).               |
| **style** 🎨  | Code changes that do not affect functionality (e.g., formatting, lint fixes).       |
| **refactor** 🔄| Code changes that neither add functionality nor fix bugs.                           |
| **perf** ⚡    | Improves performance without changing functionality.                                |
| **test** 🧪   | Adds new tests or fixes existing ones.                                              |
| **build** 🏗️  | Changes to the build process or dependencies (e.g., npm, Webpack).                  |
| **ci** 🔧     | Changes to CI/CD configurations and scripts.                                        |
| **chore** 🧹  | Routine tasks or updates that don't affect the codebase (e.g., dependency updates). |
| **revert** ⏪  | Reverts a previous commit.                                                          |
| **hotfix** 🚑 | Critical fixes that need to be deployed immediately.                                |

### **Examples:**

```bash
✨ git commit -m "feat: add login button"
🐛 git commit -m "fix: resolve header overlap issue"
📚 git commit -m "docs: update README with contributing guidelines"

## 🌿 **Branch Management**

### **Workflow:**

1. Always work on a new branch based on the task or feature.
2. Regularly pull updates from the main branch to avoid merge conflicts.
3. Use pull requests (PRs) for code reviews before merging.

---

## 📤 **Push Workflow**

### **Steps:**

1. Create a branch based on the feature or issue you're working on:
   ```bash
   🌱 git checkout -b {type}/{description}
   ```
2. Make and stage your changes:
   ```bash
   ➕ git add .
   ```
3. Commit your changes with a meaningful message:
   ```bash
   🖋️ git commit -m "{type}: {subject}"
   ```
4. Push your branch to the remote repository:
   ```bash
   🚀 git push origin {type}/{description}
   ```

### **Example:**

```bash
🌱 git checkout -b feature/user-authentication
➕ git add .
🖋️ git commit -m "feat: implement user authentication flow"
🚀 git push origin feature/user-authentication
```

---

# 🌳 **Git Flow**

Git Flow introduces a robust branching model for project development. Below is the structure and workflow for managing branches like `main`, `develop`, `release`, and `hotfix`.

## **Branching Model Overview**

### **Branch Definitions**

| **Branch**   | **Purpose**                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| **main**     | Contains production-ready code. Reflects what is currently live.            |
| **develop**  | Holds the latest code under development. Acts as an integration branch.     |
| **feature**  | Branch off `develop` to work on individual features.                        |
| **release**  | Prepare code for production. Merge back into `main` and `develop`.          |
| **hotfix**   | For urgent fixes directly on `main`. Merge into both `main` and `develop`.  |

###  **Workflow Steps**

####  **Starting a Feature**
   - Branch from `develop`:
     ```bash
     git checkout develop
     git checkout -b feature/{feature-name}
     ```

####  **Finishing a Feature**
   - Merge into `develop`:
     ```bash
     git checkout develop
     git merge feature/{feature-name}
     git branch -d feature/{feature-name}
     ```

####  **Preparing a Release**
   - Branch from `develop`:
     ```bash
     git checkout develop
     git checkout -b release/{version}
     ```
   - Test and fix issues.
   - Merge into `main` and tag the release:
     ```bash
     git checkout main
     git merge release/{version}
     git tag -a v{version} -m "Release {version}"
     ```
   - Merge back into `develop`:
     ```bash
     git checkout develop
     git merge release/{version}
     git branch -d release/{version}
     ```

####  **Hotfixing**
   - Branch from `main`:
     ```bash
     git checkout main
     git checkout -b hotfix/{issue-name}
     ```
   - Fix the issue and merge into both `main` and `develop`:
     ```bash
     git checkout main
     git merge hotfix/{issue-name}
     git tag -a v{hotfix-version} -m "Hotfix {issue-name}"

     git checkout develop
     git merge hotfix/{issue-name}
     git branch -d hotfix/{issue-name}
