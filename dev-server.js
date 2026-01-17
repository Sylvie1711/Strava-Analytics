import { createServer } from 'http';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

// Load environment variables
config();

const execAsync = promisify(exec);

// Simple API server for development
const server = createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Route to API files
  if (url.startsWith('/api/')) {
    const apiPath = url.substring(4).split('?')[0]; // Remove '/api/' and query params
    const filePath = path.join(process.cwd(), 'api', apiPath);

    try {
      if (fs.existsSync(filePath + '.js')) {
        const module = await import(filePath + '.js');
        const handler = module.default;
        
        // Collect request body
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
          try {
            let parsedBody = {};
            if (body && method === 'POST') {
              parsedBody = JSON.parse(body);
            }
            
            // Mock request/response objects
            const mockReq = { 
              method, 
              body: parsedBody,
              query: Object.fromEntries(new URL(url, `http://localhost:3001`).searchParams)
            };
            const mockRes = {
              status: (code) => ({
                json: (data) => {
                  console.log(`Response ${code}:`, JSON.stringify(data, null, 2));
                  res.writeHead(code, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify(data));
                },
                send: (data) => {
                  console.log(`Response ${code}:`, data);
                  res.writeHead(code, { 'Content-Type': 'text/plain' });
                  res.end(data);
                }
              }),
              writeHead: (code, headers) => {
                console.log(`Redirect/Status ${code}:`, headers);
                res.writeHead(code, headers);
              },
              redirect: (url) => {
                console.log(`Redirecting to: ${url}`);
                res.writeHead(302, { Location: url });
                res.end();
              },
              end: () => {
                res.end();
              },
              json: (data) => {
                console.log(`Direct json response:`, JSON.stringify(data, null, 2));
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
              }
            };

            await handler(mockReq, mockRes);
          } catch (error) {
            console.error('API Error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'API endpoint not found' }));
      }
    } catch (error) {
      console.error('Server Error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Development API server running on http://localhost:${PORT}`);
  console.log(`📡 Frontend should be configured to use this as API base`);
});
