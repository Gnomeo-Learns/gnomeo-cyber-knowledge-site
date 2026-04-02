# CS8833 Enterprise Cybersecurity Management — Reference Site

Personal reference website for Georgia Tech CS8833 / CS6239 (Enterprise Cybersecurity Management, Prof. Jerry Perullo). Built with [Astro](https://astro.build) and deployed via GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`. Changes to `.astro` files are reflected immediately.

## Build

```bash
npm run build
npm run preview   # preview the production build locally
```

## Adding a New Module or Topic Page

1. **Create the page file** in `src/pages/`:
   - Module pages go in a subdirectory: `src/pages/m3-assurance/index.astro`
   - Topic pages: `src/pages/m3-assurance/t1-appsec.astro`

2. **Use the standard layout and components**:
   ```astro
   ---
   import BaseLayout from '../../layouts/BaseLayout.astro';
   import LessonCard from '../../components/LessonCard.astro';
   import Callout from '../../components/Callout.astro';
   ---
   <BaseLayout title="Page Title" currentPath="/m3-assurance/t1-appsec">
     <section class="topic">
       <LessonCard code="Mod 3 · Topic 1 · Lesson 1" title="Lesson Title" tags={[{label:"Tag",type:"def"}]}>
         <p>Content here.</p>
         <Callout variant="green">Callout content.</Callout>
       </LessonCard>
     </section>
   </BaseLayout>
   ```

3. **Update the side nav** in `src/components/SideNav.astro`:
   - Add the new module section with its topics
   - Add the paths to the appropriate `isModuleActive()` array

4. **Add a card** to the module index page (e.g., `src/pages/m3-assurance/index.astro`)

5. **Add a card** to the landing page (`src/pages/index.astro`) overview grid

## Updating the Nav Structure

Edit `src/components/SideNav.astro` directly. The nav is hardcoded for simplicity. Add new sections following the existing pattern of collapsible module groups with topic links.

## Tag Types

| Type | CSS Class | Color | Usage |
|------|-----------|-------|-------|
| Definition | `def` | Green | Key terms and definitions |
| Framework | `fw` | Blue | Frameworks and models |
| Practical | `tip` | Orange | Career tips, practical advice |
| New | `new` | Purple | 2024+ updates |

## Callout Variants

- Default (blue): informational
- `orange`: career/practical tip
- `green`: key insight
- `purple`: recent update

## Deployment

Automatic on push to `main` via GitHub Actions. The workflow:
1. Builds the Astro site
2. Uploads to GitHub Pages

No manual deployment steps needed.

## Custom Domain (Future)

When ready to add a custom domain:
1. Add a `CNAME` file to `public/` with the domain
2. Remove `base` from `astro.config.mjs`
3. Update `site` to the custom domain URL
4. Configure DNS (CNAME + A records per GitHub's docs)
