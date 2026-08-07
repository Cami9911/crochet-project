import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [tailwindcss(), imagetools(), svgr()],
});
