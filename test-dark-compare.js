const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');

async function run() {
  const cssVariant = `
    @import "tailwindcss";
    @variant dark (&:where(.dark, .dark *));

    .test-box {
      @apply bg-white dark:bg-black;
    }
  `;
  try {
    const res = await postcss([tailwind()]).process(cssVariant, { from: undefined });
    console.log("USING @variant dark:");
    console.log(res.css.split('\n').filter(l => l.includes('dark')).slice(0, 10).join('\n'));
  } catch (e) {
    console.error("FAIL @variant:", e);
  }

  const cssCustomVariant = `
    @import "tailwindcss";
    @custom-variant dark (&:where(.dark, .dark *));

    .test-box {
      @apply bg-white dark:bg-black;
    }
  `;
  try {
    const res = await postcss([tailwind()]).process(cssCustomVariant, { from: undefined });
    console.log("USING @custom-variant dark:");
    console.log(res.css.split('\n').filter(l => l.includes('dark')).slice(0, 10).join('\n'));
  } catch (e) {
    console.error("FAIL @custom-variant:", e);
  }
}
run();
