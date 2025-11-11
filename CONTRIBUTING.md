# Contributing to 3D Narrative Scene

Thank you for your interest in contributing to this project! We welcome contributions from everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your browser and OS version

### Suggesting Enhancements

We love new ideas! Please create an issue with:
- A clear, descriptive title
- Detailed description of the proposed enhancement
- Why this enhancement would be useful
- Any relevant examples or mockups

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/sliu44artcenter/ixpproject.git
   ```

2. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git commit -m "Add: Brief description of your changes"
   ```

   Use conventional commit messages:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for improvements to existing features
   - `Docs:` for documentation changes
   - `Style:` for formatting changes
   - `Refactor:` for code refactoring

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Include screenshots for visual changes

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Code Style Guidelines

### JavaScript/React
- Use functional components with hooks
- Keep components focused and single-purpose
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Follow React best practices

### Three.js/3D Code
- Group related meshes in `<group>` elements
- Use refs for objects that need animation
- Keep geometry creation in separate functions
- Comment complex transformations

### Animations
- Use GSAP for all animations
- Keep animation durations consistent with the scene's pace
- Clean up animations on component unmount
- Use appropriate easing functions

## What We're Looking For

We're particularly interested in contributions that:

### Visual Enhancements
- New character designs
- Additional wing types or transformations
- More elaborate particle effects
- Improved lighting setups
- New post-processing effects

### Interactivity
- Additional moral choice options
- More complex character reactions
- Environmental interactions
- Sound effects integration
- Mobile touch optimizations

### Performance
- Optimization improvements
- Loading screen enhancements
- Asset compression
- Code splitting

### Accessibility
- Keyboard navigation
- Screen reader support
- Reduced motion options
- High contrast modes

## Testing

Before submitting a PR, please:
- Test in multiple browsers (Chrome, Firefox, Safari)
- Test on mobile devices
- Verify performance (60fps target)
- Check for console errors
- Test all interactive elements

## Questions?

Feel free to open an issue with the `question` label if you have any questions about contributing.

## Code of Conduct

Be respectful and considerate. We want this to be a welcoming space for everyone.

---

Thank you for contributing! 🎨✨
