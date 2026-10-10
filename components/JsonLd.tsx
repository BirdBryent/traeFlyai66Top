import React from 'react';

type JsonLdProps = {
  data: Record<string, any> | Record<string, any>[];
};

export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;
  const safe = JSON.stringify(data, (_, v) =>
    typeof v === 'string' ? v.replace(/</g, '\\u003C') : v,
  );
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

export default JsonLd;
