const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');

async function run() {
  const css = `
    @import "tailwindcss";
    @custom-variant dark (&:where(.dark, .dark *));

    .test {
      color: red;
    }
  `;
  try {
    const res = await postcss([tailwind()]).process(css, { from: undefined });
    console.log("SUCCESS, CSS length:", res.css.length);
    const darkRules = res.css.split('\n').filter(line => line.includes('dark'));
    console.log("Dark occurrences:", darkRules.slice(0, 5));
  } catch (e) {
    console.error("FAIL:", e);
  }
}
run();
