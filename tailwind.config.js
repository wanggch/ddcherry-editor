/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6366f1',  /* indigo-500 */
        'primary-light': '#e0e7ff',  /* indigo-100 */
        'primary-dark': '#4f46e5',   /* indigo-600 */
        'secondary': '#64748b', /* slate-500 */
      }
    },
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