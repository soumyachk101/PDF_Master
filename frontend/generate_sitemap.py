import re
from datetime import datetime
import os

today = datetime.now().strftime("%Y-%m-%d")

with open('src/utils/tools.js', 'r', encoding='utf-8') as f:
    content = f.read()

slugs = re.findall(r"slug:\s*'([^']+)'", content)

sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.docshift.tech/</loc>
    <lastmod>{today}</lastmod>
    <priority>1.0</priority>
  </url>
"""

for slug in slugs:
    sitemap += f"""  <url>
    <loc>https://www.docshift.tech/tool/{slug}</loc>
    <lastmod>{today}</lastmod>
    <priority>0.9</priority>
  </url>
"""

sitemap += """</urlset>
"""

with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap)

print("Sitemap generated successfully.")
