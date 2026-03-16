# Amma's Recipe Diary

Final GitHub Pages website package for the family cookbook project.

## Files
- `index.html`
- `styles.css`
- `recipes.js`
- `script.js`
- `images/`

## Publish on GitHub Pages
1. Upload all files and the `images` folder to the root of your GitHub repository.
2. Go to **Settings > Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Set **Branch** to **main** and **Folder** to **/(root)**.
5. Save.

GitHub will give you a live URL in under a minute.

## Notes
- This final version adds more uploaded recipes, category filtering, and a notebook gallery.
- Some recipes do not yet have matching handwritten images in the package; those can be added later by dropping more images into `images/` and updating `recipes.js`.


## Image update
This package places all descriptively named handwritten recipe pages directly inside the `images/` folder.

- Files prefixed with `page-` are full notebook page images.
- Recipe-specific cropped images use standardized kebab-case names such as `cauliflower-curry.jpeg` or `vegetable-salna.jpeg`.
- `recipe-image-manifest.json` maps each website recipe title to its cropped image file.
