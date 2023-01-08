/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}", "./public/index.html"],
	theme: {
	  extend: {
		fontFamily: {
		  over: "'Overpass', sans-serif",
		  dyna: "'DynaPuff', cursive",
		},
		backgroundImage: {
		  home: "url('./src/assets/images/background.jpeg')",
		},
	  },
	},
	plugins: [],
  };
  