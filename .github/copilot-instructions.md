# Bitburner Scripts Development Environment

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

This repository contains TypeScript scripts for the Bitburner incremental programming game. Scripts are written in TypeScript, compiled to JavaScript, and then imported into Bitburner for automated gameplay.

## Working Effectively

### Bootstrap and Setup
Always run these commands in order when starting with a fresh clone:

```bash
# Install Node.js dependencies (takes ~10 seconds, NEVER CANCEL)
npm install

# Verify the environment works
npm run dev
```

**NEVER CANCEL: npm install takes approximately 10 seconds. Set timeout to 30+ seconds.**

### Core Development Commands
All commands are fast (under 3 seconds) unless noted:

```bash
# Full development pipeline (clean, build, lint, format check)
npm run dev                    # Takes ~3 seconds, NEVER CANCEL, timeout 60+ seconds

# Individual commands
npm run build                  # Compile TypeScript (~1.3 seconds)
npm run clean                  # Remove dist/ directory
npm run lint                   # ESLint check (~1.2 seconds)  
npm run lint:fix              # Auto-fix ESLint issues
npm run format                # Auto-format with Prettier (~0.5 seconds)
npm run format:check          # Check Prettier formatting (~0.5 seconds)
npm run watch                  # TypeScript watch mode (runs continuously)
```

### TypeScript Compilation
- **Source**: `src/*.ts` - Write all Bitburner scripts here
- **Output**: `dist/*.js` - Compiled JavaScript ready for Bitburner
- **Always use** `export async function main(ns: NS)` as entry point
- **Build time**: ~1.3 seconds for typical codebase

### File Structure
```
src/                           # TypeScript source files
├── early-hack.ts             # Basic hacking script
├── scan.ts                   # Network scanner utility  
└── batch-manager.ts          # Advanced HWGW batch manager

dist/                          # Compiled JavaScript (auto-generated)
├── early-hack.js
├── scan.js
└── batch-manager.js

tsconfig.json                  # TypeScript configuration
eslint.config.js              # ESLint configuration (ES modules format)
.prettierrc                   # Prettier formatting rules
package.json                  # Node.js dependencies and scripts
```

## Validation

### Always Run Before Committing
```bash
# Complete validation pipeline
npm run dev

# Manual validation test
node test-scripts.js           # Takes ~0.2 seconds - validates script syntax
```

### Manual Testing Scenarios
After making changes to Bitburner scripts:

1. **Syntax Validation**: `npm run build` - Must complete without TypeScript errors
2. **Lint Validation**: `npm run lint` - Must pass without ESLint errors  
3. **Format Validation**: `npm run format:check` - Must pass Prettier formatting
4. **Runtime Test**: `node test-scripts.js` - Validates scripts can load and execute basic operations

### NS Interface Requirements
All Bitburner scripts must use the NS interface. Essential properties include:
- `ns.hack()`, `ns.grow()`, `ns.weaken()` - Core game functions
- `ns.print()`, `ns.tprint()` - Logging functions
- `ns.scan()` - Network scanning
- `ns.args` - Command line arguments  
- `ns.sleep()` - Async delay function

## Common Tasks

### Creating New Bitburner Scripts
1. Create `src/script-name.ts`
2. Use this template:
```typescript
interface NS {
  // Add required NS methods here
  print(msg: string): void;
  // ... other methods as needed
}

export async function main(ns: NS): Promise<void> {
  // Your script logic here
  ns.print("Script started");
}
```
3. Run `npm run dev` to build and validate
4. Copy `dist/script-name.js` to Bitburner

### Debugging Build Issues
- **TypeScript errors**: Check `src/*.ts` files for type issues
- **ESLint errors**: Run `npm run lint:fix` to auto-fix common issues
- **Format errors**: Run `npm run format` to auto-format files
- **Missing dependencies**: Run `npm install` if node_modules is missing

### Performance Expectations
- **npm install**: ~10 seconds (clean install)
- **npm run build**: ~1.3 seconds
- **npm run lint**: ~1.2 seconds  
- **npm run format**: ~0.5 seconds
- **npm run dev**: ~3 seconds (complete pipeline)
- **Validation test**: ~0.2 seconds

**NEVER CANCEL any build or install commands. All operations complete quickly (under 10 seconds).**

## Environment Details
- **Node.js**: v20.19.5 or compatible
- **npm**: v10.8.2 or compatible  
- **TypeScript**: Latest (installed as dev dependency)
- **ESLint**: v9+ with new flat config format
- **Prettier**: Latest for code formatting

## Repository Structure Notes
- Use `src/` for all TypeScript source files
- Generated `dist/` contains JavaScript for Bitburner import
- All linting and formatting configs are pre-configured
- Scripts compile to ES2020 modules suitable for Bitburner
- Mock testing environment validates basic script functionality

Always validate your changes with `npm run dev` before committing to ensure all build, lint, and format checks pass.