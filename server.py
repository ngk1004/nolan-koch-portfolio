#!/usr/bin/env python3
"""
Simple HTTP server for serving the Lithos site locally.
Serves the Vite build output from dist/ when present, otherwise the repo root.
Run: npm run build && python3 server.py
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8000
ROOT = Path(__file__).parent
DIST = ROOT / "dist"
DIRECTORY = DIST if DIST.is_dir() else ROOT


class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()


def main():
    os.chdir(DIRECTORY)

    if DIRECTORY == DIST:
        print(f"Serving production build from: {DIST}")
    else:
        print("dist/ not found — serving repo root.")
        print("For the Lithos hero, run: npm run build && python3 server.py")
        print("For development, use: npm run dev")

    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Open http://localhost:{PORT}")
        print("Press Ctrl+C to stop.")
        print("-" * 50)

        try:
            webbrowser.open(f"http://localhost:{PORT}")
        except OSError:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            httpd.shutdown()


if __name__ == "__main__":
    main()
