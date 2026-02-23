# Contributing to Summer of Bitcoin Organizations

Thank you for considering contributing to this project! Every contribution helps make this resource better for students interested in Summer of Bitcoin.

## How to Contribute

### 1. Reporting Issues

If you find a bug, incorrect data, or have a feature suggestion:

- Open an [issue](https://github.com/Jaydeep869/SOB_Organizations/issues) on GitHub
- Clearly describe the problem or suggestion
- Include screenshots if applicable

### 2. Improving Organization Data

The data displayed is sourced from the [Summer of Bitcoin](https://www.summerofbitcoin.org/) website. There may be missing or incorrect entries. You can help by:

- **Adding missing projects/students** — Update `src/data.js` with real project names, student names, and descriptions
- **Fixing incorrect GitHub URLs** — Some organizations may have wrong or outdated repository links
- **Correcting technologies/topics** — If an organization's listed technologies don't match what they actually use, submit a fix

### 3. Improving UI / UX

PRs that improve the user interface or user experience are greatly appreciated. Some ideas:

- Better responsive layouts
- Accessibility improvements
- Dark mode support
- Performance optimizations

### 4. Adding Features

If you can think of a feature that would help people exploring Summer of Bitcoin organizations, feel free to open an issue for discussion. Some ideas:

- Organization comparison view
- Statistics dashboard
- Export/share functionality

## Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/<your-username>/SOB_Organizations.git
cd SOB_Organizations

# Install dependencies
npm install

# Start development server
npm run dev
```

## Pull Request Process

1. **Fork** the repository and create your branch from `main`
2. **Make your changes** — keep them focused and atomic
3. **Test** your changes locally (`npm run build` should pass)
4. **Commit** with a clear, descriptive message
5. **Push** to your fork and open a Pull Request

### Commit Message Guidelines

Use clear, descriptive commit messages:

```
feat: add dark mode toggle
fix: correct Bitcoin Core GitHub URL
data: add 2024 project entries for LDK
docs: update contributing guidelines
style: improve mobile card layout
```

### Code Style

- Follow the existing code style in the project
- Use functional React components with hooks
- Keep components small and focused
- Use MUI components and theming consistently

## Code of Conduct

Be respectful and constructive. We're all here to make bitcoin open-source better.

## Questions?

Feel free to open an issue or reach out if you have any questions about contributing.

---

Thank you for helping improve this project! 🧡
