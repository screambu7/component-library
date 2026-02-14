// components/sections/contact/contact-1.tsx
// Contact page with info cards (email, office, phone) + social links
// Inspired by Efferd Contact-1 (Free block)

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ContactInfo {
  type: 'email' | 'office' | 'phone';
  icon: React.ReactNode;
  title: string;
  value: string;
  detail?: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface Contact1Props {
  title?: string;
  subtitle?: string;
  contacts?: ContactInfo[];
  socials?: SocialLink[];
  className?: string;
}

export function Contact1({
  title = 'Contact Us',
  subtitle = 'Contact our support team.',
  contacts,
  socials,
  className,
}: Contact1Props) {
  const defaultContacts: ContactInfo[] = contacts || [
    {
      type: 'email',
      icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>,
      title: 'Email',
      value: 'mail@example.com',
      detail: 'We respond to all emails within 24 hours.',
    },
    {
      type: 'office',
      icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>,
      title: 'Office',
      value: '123 Main Street',
      detail: 'Drop by our office for a chat.',
    },
    {
      type: 'phone',
      icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>,
      title: 'Phone',
      value: '+1 (555) 000-0000',
      detail: "We're available Mon-Fri, 9am-5pm.",
    },
  ];

  return (
    <section className={cn('py-20 lg:py-32', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {defaultContacts.map((contact) => (
            <div
              key={contact.type}
              className="rounded-xl border border-border p-6 text-center space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted text-foreground">
                {contact.icon}
              </div>
              <h3 className="font-semibold text-sm">{contact.title}</h3>
              <p className="text-sm font-mono">{contact.value}</p>
              {contact.detail && (
                <p className="text-xs text-muted-foreground">{contact.detail}</p>
              )}
            </div>
          ))}
        </div>

        {/* Social Links */}
        {socials && socials.length > 0 && (
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Find us <span className="font-semibold text-foreground">online</span>
            </p>
            <div className="flex items-center justify-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
                >
                  {social.icon}
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact1;
