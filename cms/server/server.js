import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths relative to cms/server/
const PROJECT_ROOT = path.join(__dirname, '../../');
const TIMELINE_DIR = path.join(PROJECT_ROOT, 'src/content/timeline');
const ASSETS_DIR = path.join(PROJECT_ROOT, 'src/assets');

const app = express();
app.use(cors());
app.use(express.json());

// Set up image upload handling with multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure assets directory exists
        if (!fsSync.existsSync(ASSETS_DIR)) {
            fsSync.mkdirSync(ASSETS_DIR, { recursive: true });
        }
        cb(null, ASSETS_DIR);
    },
    filename: (req, file, cb) => {
        // Use original name but ensure it's safe and potentially unique
        const safeName = Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        cb(null, safeName);
    }
});
const upload = multer({ storage });

// API: Get all events
app.get('/api/events', async (req, res) => {
    try {
        const files = await fs.readdir(TIMELINE_DIR);
        const mdFiles = files.filter(f => f.endsWith('.md'));

        const events = await Promise.all(mdFiles.map(async (file) => {
            const content = await fs.readFile(path.join(TIMELINE_DIR, file), 'utf-8');
            // Extract frontmatter
            const match = content.match(/^---([\s\S]*?)---/);
            if (match) {
                const frontmatter = yaml.load(match[1]);
                return { id: file, ...frontmatter };
            }
            return null;
        }));

        // Sort by year descending
        const validEvents = events.filter(e => e !== null).sort((a, b) => {
            return parseInt(b.year) - parseInt(a.year);
        });

        res.json(validEvents);
    } catch (error) {
        console.error('Error reading events:', error);
        res.status(500).json({ error: 'Failed to read events' });
    }
});

// API: Create new event
app.post('/api/events', async (req, res) => {
    try {
        const { year, titleEn, titleZh, descriptionEn, descriptionZh, image } = req.body;

        if (!year || !titleEn || !titleZh) {
            return res.status(400).json({ error: 'Year and titles are required' });
        }

        // Generate filename based on year and english title
        const safeTitle = titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const filename = `${year}-${safeTitle}.md`;
        const filePath = path.join(TIMELINE_DIR, filename);

        // Prepare frontmatter
        const frontmatter = {
            year: parseInt(year),
            title: {
                en: titleEn,
                zh: titleZh
            },
            description: {
                en: descriptionEn || "",
                zh: descriptionZh || ""
            }
        };

        if (image) {
            frontmatter.image = `../../assets/${image}`;
        }

        // Generate markdown content
        const markdown = `---\n${yaml.dump(frontmatter)}---\n`;

        // Ensure timeline directory exists
        if (!fsSync.existsSync(TIMELINE_DIR)) {
            fsSync.mkdirSync(TIMELINE_DIR, { recursive: true });
        }

        await fs.writeFile(filePath, markdown, 'utf-8');
        res.status(201).json({ message: 'Event created successfully', filename });

    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// API: Upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ filename: req.file.filename });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`CMS Server running on http://localhost:${PORT}`);
    console.log(`Managing markdown at: ${TIMELINE_DIR}`);
});
