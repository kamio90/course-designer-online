# PARKUR DESIGNER – ENTERPRISE-GRADE PRINCIPAL DEVELOPER MASTER DESIGN DOCUMENT

---

## 1. Foundation & Philosophy

**Vision:**
Parkur Designer will be the gold standard for browser-based equestrian course and area design—modular, scalable, accessible, beautiful, and as powerful as modern pro tools.

**Methodology:**
* **Component-first**: Every element is a JS module/folder, with style/logic/i18n self-contained.
* **Material Design**
* **State = Single Source of Truth**
* **Router = Flow Master**
* **Internationalization-first**
* **Accessibility-first**
* **Responsiveness**
* **Testing at Every Level**

## 2. Project & File Structure
```
src/
  main.js                # Application router/entrypoint
  store.js               # Centralized state, reducers, action creators
  i18n.js                # Language setup & helper
  components/
    App/
      index.js
      style.js
    Sidebar/
      index.js
      style.js
      i18n.js
      test.js
    Topbar/
      index.js
      style.js
    MainCanvas/
      index.js
      style.js
      test.js
    RightPanel/
      index.js
      style.js
    LoginForm/
      index.js
      style.js
      i18n.js
    RegisterForm/
      index.js
      style.js
      i18n.js
    CourseList/
      index.js
      style.js
      test.js
    ObstacleToolbox/
      index.js
      style.js
    ...
  assets/
  utils/
  constants/
```

## 3. Global Standards & Enterprise Policies
### Componentization
* No direct DOM queries except inside the component root.
* All styles via JS-injected `<style>`.
* Each component gets its own namespace.

### Internationalization
* All user-facing copy from i18n.
* `i18n.js` in each component exports a `labels` object.

### Routing & State
* `main.js` = top-level router. All navigation by `setRoute`.
* Global store with `user`, `token`, `locale`, `view`, `area`, `objects`, `history`, `ui`.
* Never mutate store directly.

### Undo/Redo
* Every state-changing action pushes the state into the undo stack.
* Undo/redo always available.

### Navigation/Back
* Every major view has a Back/Cancel button.
* Work cached in store.

### Testing
* Jest/unit tests for components.
* Cypress/E2E for user flows.

## 4. Full View & Flow Breakdown
### View 1: Login
Purpose: Secure authentication entry.
* **LoginForm component** with username/email, password, social buttons, "Forgot password?" and "Register" links.
* Behavior: Fake API simulates latency. On success dispatches login, on error shows i18n messages. Accessibility features.

### View 2: Register
* Similar to Login with realtime validation.

### View 3: Homepage (Dashboard)
* **CourseList component** with tabs, cards, context menu, New course FAB, sorting/filtering/search.
* **UserBar component** with avatar, logout, language switch.

### View 4: Course Area Editor
* **Topbar** with help button, scale control, center button, zoom controls, clear all, undo/redo.
* **Sidebar** steps: accept area; static objects toolbox; back to area editing.
* **MainCanvas** drawing polygon, snap-to-grid, static objects, keyboard access.
* **RightPanel (StatsPanel)** shows statistics.

### View 5: Course Editor
* Similar topbar/right panel.
* **ObstacleToolbox** to place obstacles, numbering, group/ungroup.
* **MainCanvas** for obstacles.

## 5. Advanced UI/UX Edge Cases, Error Handling & Accessibility
* Navigation, undo/redo, performance considerations, accessibility details.
* Internationalization guidelines.

## 6. Development & Delivery Standards
* Component PRs must include JS, style, i18n, tests.
* Continuous integration with linting, tests, bundle check.
* Documentation requirements.
* Release flow.
* Security & privacy guidelines.

## 7. Iteration & GPT-4.1 Collaboration Guidelines
* Every code request must specify the component folder.
* Each iteration updates only necessary files.
* No quick fixes in main.js.
* Always request Material Design compliance, accessibility, undo/redo, stats updates.

## 8. Examples of GPT-4.1-Ready Requests
* Example requests for components, refactoring, tests, etc.

## 9. Future-Proofing & Extensions
* Dark/light theme toggle, file upload, exports, plugin system, collaboration, analytics, offline support, mobile layout.

## 10. Absolute Non-Negotiables
* No hardcoded copy, colors, or layout.
* No direct DOM manipulation outside component root.
* No business logic in the router.
* No monolithic components for multiple views.
* All new flows/components tested, documented, i18n.
* UI/UX must be accessible, responsive, undoable, extendable.
* All PRs reviewed, code explained, iterations justified.

## Summary
This document is the single, exhaustive source for building, extending, and maintaining Parkur Designer. If in doubt, add more detail and never cut corners.
