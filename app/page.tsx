
"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loadedUrl, setLoadedUrl] = useState("");
  const [error, setError] = useState("");

  const loadUrl = () => {
    setError("");

    try {
      const parsed = new URL(url);

      if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error("Only HTTP and HTTPS URLs are supported.");
      }

      setLoadedUrl(parsed.href);
    } catch {
      setError("Please enter a valid HTTP or HTTPS URL.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Iframe Tester
        </h1>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadUrl()}
            placeholder="https://example.com"
            className="flex-1 rounded-lg border bg-white px-4 py-3 text-gray-900"
          />

          <button
            onClick={loadUrl}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Load URL
          </button>
        </div>

        {error && (
          <p className="mb-4 text-red-600">{error}</p>
        )}

        <div className="overflow-hidden rounded-lg border bg-white shadow">
          <div className="flex items-center justify-between border-b p-3">
            <span className="text-sm text-gray-600">
              {loadedUrl || "No URL loaded"}
            </span>

            {loadedUrl && (
              <div className="flex gap-3">
                <button
                  onClick={() => setLoadedUrl("")}
                  className="text-sm text-red-600"
                >
                  Clear
                </button>
                <button
                  onClick={() => window.open(loadedUrl, "_blank")}
                  className="text-sm text-blue-600"
                >
                  Open in new tab
                </button>
              </div>
            )}
          </div>

          {loadedUrl ? (
            <iframe
              key={loadedUrl}
              src={loadedUrl}
              title="Iframe Preview"
              className="h-[75vh] w-full"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
            />
          ) : (
            <div className="flex h-[75vh] items-center justify-center text-gray-400">
              Enter a URL to preview it here
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

