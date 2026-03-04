import Link from 'next/link';
import { FilePlus2, FileMinus2, FileCog, ImageDown, Images } from 'lucide-react';

const tools = [
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDFs into a single document.',
    icon: FilePlus2
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Extract pages or split your PDF by ranges.',
    icon: FileMinus2
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce PDF file size while keeping quality.',
    icon: FileCog
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Turn PDF pages into high-quality JPG images.',
    icon: ImageDown
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert images into a single PDF.',
    icon: Images
  }
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Every PDF tool you need.
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-base text-slate-600">
          Merge, split, compress, and convert your documents in seconds. Files are encrypted in
          transit and automatically deleted after processing.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/tools/merge-pdf"
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
          >
            Start with Merge PDF
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Most popular tools</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <tool.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{tool.name}</h3>
                  <p className="text-xs text-slate-500">{tool.description}</p>
                </div>
              </div>
              <span className="mt-auto text-xs font-medium text-primary-600 group-hover:text-primary-700">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

