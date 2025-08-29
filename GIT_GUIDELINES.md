# Git Guidelines

This document outlines the git workflow and conventions used in this project.

## Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- **feat:** A new feature for the user
- **fix:** A bug fix for the user
- **docs:** Documentation only changes
- **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **test:** Adding missing tests or correcting existing tests
- **chore:** Changes to the build process or auxiliary tools and libraries such as documentation generation
- **build:** Changes that affect the build system or external dependencies
- **ci:** Changes to CI configuration files and scripts

### Examples

#### Good Commit Messages

```bash
feat: add user authentication with NextAuth.js
fix: resolve issue with form validation on mobile devices
docs: update API documentation for user endpoints
chore: add Docker configuration for development environment
refactor: extract user service into separate module
test: add unit tests for user validation logic
```

#### Bad Commit Messages

```bash
# Too vague
fix: bug fix
feat: new feature
chore: updates

# Not following convention
Added new login page
Fixed the thing
Update README
```

## Branch Naming Conventions

- **feature/**: New features (`feature/user-authentication`)
- **fix/**: Bug fixes (`fix/login-validation-error`)
- **chore/**: Maintenance tasks (`chore/update-dependencies`)
- **docs/**: Documentation updates (`docs/api-documentation`)
- **refactor/**: Code refactoring (`refactor/user-service`)

## Semantic Versioning

We follow [Semantic Versioning (SemVer)](https://semver.org/):

- **MAJOR** version when you make incompatible API changes
- **MINOR** version when you add functionality in a backwards compatible manner
- **PATCH** version when you make backwards compatible bug fixes

### Version Bump Guidelines

- `feat:` → MINOR version bump
- `fix:` → PATCH version bump
- `feat:` with `BREAKING CHANGE:` footer → MAJOR version bump
- `fix:` with `BREAKING CHANGE:` footer → MAJOR version bump

## Git Workflow

1. **Create feature branch** from `main`
2. **Make commits** following conventional commits format
3. **Test changes** locally
4. **Create pull request** with descriptive title and body
5. **Review and merge** to `main`
6. **Tag releases** following semantic versioning

## Commit Message Best Practices

### Do:

- Use imperative mood ("add" not "added" or "adds")
- Keep the first line under 50 characters
- Capitalize the first letter of the description
- Don't end the subject line with a period
- Use the body to explain what and why, not how

### Don't:

- Use past tense ("added", "fixed")
- Be vague or generic
- Include implementation details in the subject
- Use generic messages like "update", "fix", or "change"

## Examples with Body

```bash
feat: implement user dashboard with analytics

- Add user statistics component with charts
- Integrate with analytics API for data fetching
- Include responsive design for mobile devices
- Add loading states and error handling

Closes #123
```

```bash
fix: resolve memory leak in data fetching hook

The useEffect hook was not properly cleaning up subscriptions
when components unmounted, causing memory leaks in long-running
sessions.

- Add cleanup function to useEffect
- Implement AbortController for fetch requests
- Add tests to verify cleanup behavior

Fixes #456
```

## Release Process

1. Update version in `package.json`
2. Create release commit: `chore: release v1.2.0`
3. Tag the release: `git tag v1.2.0`
4. Push tags: `git push --tags`
5. Create GitHub release with changelog

