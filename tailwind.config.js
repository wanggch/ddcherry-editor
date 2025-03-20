/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // safelist: [
  //   'p-4', 'flex', 'w-1/2', 'border-r', 'overflow-auto',
  //   'justify-between', 'items-center', 'border-b',
  //   'gap-2', 'p-2', 'rounded', 'hover:bg-gray-100',
  //   'h-full', 'flex-col', 'flex-grow',
  //   'h-screen', 'text-xl', 'font-bold'
  // ],
  plugins: [],
} 