import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    watch: {
      ignored: ['**/db.json'], // 👈 Vite sẽ bỏ qua không reload khi file db.json thay đổi
    },
  },
});
