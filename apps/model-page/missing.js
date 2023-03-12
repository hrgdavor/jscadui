import fs from 'fs';

process.exit(fs.existsSync( process.argv[1] ) ? 0:1)
