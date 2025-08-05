'use client';

import { useState } from 'react';
import { Plus, FileText, Folder, Edit3 } from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const contentTypes = [
    { id: 'thoughts', name: 'Thoughts', icon: FileText, count: 3 },
    { id: 'blog', name: 'Blog Posts', icon: FileText, count: 1 },
    { id: 'projects', name: 'Projects', icon: Folder, count: 1 },
    { id: 'talks', name: 'Talks', icon: FileText, count: 0 },
    { id: 'now', name: 'Now Page', icon: Edit3, count: 0 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Content Admin
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Manage your portfolio content
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-neutral-200 dark:border-neutral-800">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300'
              }`}
            >
              Content
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {contentTypes.map((type) => (
                <div
                  key={type.id}
                  className="rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700"
                >
                  <div className="flex items-center">
                    <type.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        {type.name}
                      </p>
                      <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                        {type.count}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Quick Actions
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <button className="flex items-center gap-3 rounded-lg border border-dashed border-neutral-300 p-4 text-left transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:border-neutral-600 dark:hover:bg-neutral-900">
                  <Plus className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                      New Thought
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Quick note or idea
                    </p>
                  </div>
                </button>
                <button className="flex items-center gap-3 rounded-lg border border-dashed border-neutral-300 p-4 text-left transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:border-neutral-600 dark:hover:bg-neutral-900">
                  <Plus className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                      New Blog Post
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Long-form article
                    </p>
                  </div>
                </button>
                <button className="flex items-center gap-3 rounded-lg border border-dashed border-neutral-300 p-4 text-left transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:border-neutral-600 dark:hover:bg-neutral-900">
                  <Plus className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                      New Project
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Showcase work
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.19-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Development Note
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <p>
                      This is a basic admin interface. In a production environment, you would:
                    </p>
                    <ul className="mt-2 list-disc list-inside">
                      <li>Add authentication and authorization</li>
                      <li>Implement file editing capabilities</li>
                      <li>Add Git integration for content commits</li>
                      <li>Include image upload and management</li>
                      <li>Add content validation and preview</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Content Management Instructions
              </h2>
              <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    📝 Creating Content
                  </h3>
                  <p>
                    Create new markdown files in the appropriate <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">/content/</code> directory:
                  </p>
                  <ul className="mt-2 list-disc list-inside ml-4">
                    <li><code>/content/thoughts/</code> - Short-form posts</li>
                    <li><code>/content/blog/</code> - Long-form articles</li>
                    <li><code>/content/projects/</code> - Project showcases</li>
                    <li><code>/content/talks/</code> - Speaking engagements</li>
                    <li><code>/content/now/</code> - Current activities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    📋 Frontmatter Template
                  </h3>
                  <pre className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded text-xs overflow-x-auto">
{`---
title: "Your Content Title"
description: "Brief description for SEO and previews"
date: "2025-01-05"
tags: ["tag1", "tag2", "tag3"]
published: true
# Project-specific fields
techStack: ["Next.js", "TypeScript"]
liveUrl: "https://example.com"
githubUrl: "https://github.com/twilighty-abhi/repo"
---

Your markdown content goes here...`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    🚀 Publishing
                  </h3>
                  <p>
                    Once you've created your content files, the site will automatically include them. 
                    Set <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">published: false</code> for drafts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
