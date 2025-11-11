# 3D Narrative Scene - The Choice

An interactive 3D narrative experience exploring moral choices through visual storytelling. Built with React, Three.js, and GSAP.

![Project Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.2-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.160-orange)
![GSAP](https://img.shields.io/badge/GSAP-3.12-green)

## 🎭 Concept

Experience a wordless moral narrative where your choices shape the character and environment:

- **Golden Halo** ✨ - Choose the path of virtue and watch angel wings emerge
- **Red Flame** 🔥 - Embrace darkness as devil wings manifest
- **Gray Balance** ⚖️ - Remain neutral and unchanged

All storytelling is achieved through **visual symbolism** and **cinematic animations** - no text, only motion and transformation.

## ✨ Features

- **Interactive 3D Character** - A humanoid figure that transforms based on your moral choice
- **Three Symbolic Icons** - Floating, glowing symbols representing different moral paths
- **Dynamic Transformations** - Wings grow from the character with smooth GSAP animations
- **Environmental Changes** - Background shifts to golden warmth or deep crimson based on choice
- **Particle Effects** - Rising golden light or falling embers accompany transformations
- **Post-Processing** - Bloom and vignette effects for cinematic quality
- **Hover Interactions** - Icons pulse and glow when hovered
- **Ambient Animation** - Character breathes and icons float continuously

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sliu44artcenter/ixpproject.git
cd ixpproject
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to:
```
http://localhost:3000
```

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## 🌐 Deploy to GitHub Pages

1. Update the `base` path in `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/', // Change to your repository name
  // ...
})
```

2. Build and deploy:
```bash
npm run deploy
```

This will build the project and push it to the `gh-pages` branch.

3. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Select `gh-pages` branch as source
   - Save

Your site will be live at: `https://yourusername.github.io/your-repo-name/`

## 🎮 How to Experience

1. **Load the Scene** - Wait for the 3D environment to load
2. **Observe** - The character stands in the center with three floating symbols around them
3. **Hover** - Move your mouse over each symbol to see them glow and pulse
4. **Choose** - Click on a symbol to commit to a moral path
5. **Watch** - Experience the transformation as wings grow and the environment shifts
6. **Reflect** - Consider the visual storytelling and symbolic representation

## 🏗️ Project Structure

```
ixpproject/
├── src/
│   ├── components/
│   │   └── Scene.jsx          # Main 3D scene with Three.js
│   ├── styles/
│   │   ├── index.css          # Global styles
│   │   └── App.css            # App-specific styles
│   ├── App.jsx                # Root React component
│   └── main.jsx               # React entry point
├── public/                    # Static assets
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🛠️ Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Three.js** - 3D rendering engine
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **@react-three/postprocessing** - Post-processing effects
- **GSAP** - Professional animation library
- **PostProcessing** - Visual effects pipeline

## 🎨 Key Technical Features

### Character System
- Procedurally generated humanoid using Three.js primitives
- Capsule geometry for body and limbs
- Smooth idle breathing animation
- Material system with emissive properties for glow effects

### Wing Transformations
- **Angel Wings**: White, feathered design with golden emissive glow
- **Devil Wings**: Dark, bat-like cone geometry with red embers
- Scale-from-zero animation using GSAP's elastic easing

### Interactive Icons
- **Halo**: Torus geometry (golden ring)
- **Flame**: Cone geometry (pointed upward)
- **Balance**: Box geometry (horizontal scale)
- Each icon has outer glow sphere and hover pulse effects

### Environmental Effects
- Dynamic background color transitions
- Fog that matches background color
- Particle systems (rising for good, falling for evil)
- Additive blending for luminous particles

### Lighting Setup
- Ambient light for base illumination
- Directional light with shadow casting
- Spot light for rim lighting
- Point light from below for fill

### Post-Processing
- **Bloom**: Creates glow around bright objects
- **Vignette**: Darkens edges for cinematic framing

## 🎯 Design Philosophy

### Visual-Only Storytelling
- No text labels or dialogue
- Communication through symbolism and motion
- Universal understanding across languages and cultures

### Cinematic Presentation
- Limited camera movement for focused attention
- Dramatic lighting with shadows
- Post-processing for film-quality visuals
- Carefully timed animations for emotional impact

### Interactive Narrative
- User agency in moral choice
- Immediate visual feedback
- Irreversible decisions (like real moral choices)
- Contemplative pacing

## 🔧 Customization

### Adjusting Camera
Edit `Scene.jsx`:
```javascript
<PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
```

### Changing Colors
Modify background transitions in `Background` component:
```javascript
// For good choice
{ r: 0.8, g: 0.65, b: 0.3 } // Warm golden

// For evil choice
{ r: 0.4, g: 0.05, b: 0.05 } // Deep red
```

### Adding More Choices
1. Add new icon type in `ChoiceIcons`
2. Create geometry in icon components
3. Add transformation logic in `Character` component
4. Update background colors in `Background` component

## 🐛 Troubleshooting

### Performance Issues
- Reduce particle count in `ParticleEffects`
- Lower shadow map size in lighting setup
- Disable post-processing effects
- Reduce `dpr` in Canvas props

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Deployment Issues
- Ensure `base` path matches your repository name
- Check GitHub Pages is enabled in repository settings
- Verify `gh-pages` branch exists

## 📱 Browser Compatibility

- Chrome/Edge (v90+) ✅
- Firefox (v88+) ✅
- Safari (v14+) ✅
- Mobile browsers supported with touch controls

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Three.js community for excellent documentation
- @react-three ecosystem for React integration
- GSAP for professional animation tools
- Inspired by wordless storytelling in games like Journey and Inside

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ using React, Three.js, and GSAP**

*Experience the power of visual storytelling in 3D*
