const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');

async function run() {
  const css = `
    @import "tailwindcss";
    @variant dark (.dark &, &.dark);
  `;
  const res = await postcss([tailwind()]).process(css, { from: undefined });
  console.log("Output for bg-slate-950:");
  console.log(res.css.split('\n').filter(l => l.includes('bg-slate-950') && l.includes('dark')).slice(0, 5).join('\n'));
}
run();
