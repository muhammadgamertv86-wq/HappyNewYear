import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                home: resolve(__dirname, 'home.html'),
                wish: resolve(__dirname, 'wish.html'),
                story: resolve(__dirname, 'story.html'),
                glimpse: resolve(__dirname, 'glimpse.html'),
                game: resolve(__dirname, 'game.html'),
                duniya: resolve(__dirname, 'duniya.html'),
                future: resolve(__dirname, 'future.html'),
                '2025': resolve(__dirname, '2025.html'),
            },
        },
    },
});
