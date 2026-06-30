import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [tailwindcss(), imagetools()],
});
