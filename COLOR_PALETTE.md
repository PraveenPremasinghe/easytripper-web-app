# Sri Lanka Brand Color Palette - 60-30-10 Rule

## Color Scheme Overview

This webapp uses a Sri Lanka-inspired color palette following the **60-30-10 UI/UX design rule**:

### 60% - Dominant Color (Background/Base)
- **Warm Cream**: `#FAF8F3` - Represents beaches, temples, and light
- **Light Cream**: `#FFFBF5` - Lighter variant
- **Dark Cream**: `#F5F1E8` - Darker variant

**Usage**: Main backgrounds, card backgrounds, neutral spaces

### 30% - Secondary Color (Primary Brand)
- **Rich Emerald Green**: `#0D9488` - Represents tea plantations, nature, emerald
- **Deep Emerald**: `#0F766E` - Darker variant for depth
- **Light Emerald**: `#14B8A6` - Lighter variant

**Usage**: Primary buttons, links, headings, brand elements, CTAs

### 10% - Accent Color (Highlights)
- **Golden Amber**: `#F59E0B` - Represents temples, sunsets, spices
- **Deep Amber**: `#D97706` - Darker variant
- **Light Amber**: `#FBBF24` - Lighter variant

**Usage**: Call-to-action buttons, highlights, important elements, hover states

## Text Colors
- **Primary Text**: `#1C1917` (Dark brown/charcoal)
- **Muted Text**: `#57534E` (Medium brown/gray)

## Implementation

### CSS Variables (globals.css)
All colors are defined as CSS variables for easy theming:
- `--primary`: `#0D9488` (Emerald Green)
- `--accent`: `#F59E0B` (Golden Amber)
- `--background`: `#FAF8F3` (Warm Cream)
- `--foreground`: `#1C1917` (Dark Text)

### Tailwind Classes
- Use `bg-[#FAF8F3]` for dominant backgrounds
- Use `text-primary` or `bg-primary` for secondary color
- Use `text-accent` or `bg-accent` for accent color
- Use `text-[#1C1917]` for primary text
- Use `text-[#57534E]` for muted text

## Design Principles

1. **60% Rule**: Most of the page should use warm cream backgrounds
2. **30% Rule**: Emerald green should be used for primary actions and brand elements
3. **10% Rule**: Golden amber should be used sparingly for maximum impact (CTAs, highlights)

## Color Psychology

- **Warm Cream**: Calm, welcoming, tropical, clean
- **Emerald Green**: Nature, growth, harmony, Sri Lankan tea plantations
- **Golden Amber**: Energy, warmth, luxury, Sri Lankan temples and sunsets

