interface SimpleMarkdownProps {
  content: string;
  className?: string;
}

const formatInline = (text: string) => {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index} className="bg-foreground/10 px-1.5 py-0.5 text-sm">{part.slice(1, -1)}</code>;
    }

    return part;
  });
};

const SimpleMarkdown = ({ content, className = '' }: SimpleMarkdownProps) => {
  const blocks = content.split(/\n{2,}/).filter(Boolean);

  return (
    <div className={className}>
      {blocks.length === 0 ? (
        <p className="text-muted-foreground">Your markdown preview will appear here.</p>
      ) : (
        blocks.map((block, index) => {
          const trimmed = block.trim();

          if (trimmed.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-black uppercase tracking-tight mt-8 mb-3">{trimmed.replace(/^###\s/, '')}</h3>;
          }

          if (trimmed.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-black uppercase tracking-tight mt-10 mb-4">{trimmed.replace(/^##\s/, '')}</h2>;
          }

          if (trimmed.startsWith('# ')) {
            return <h1 key={index} className="text-3xl font-black uppercase tracking-tight mt-10 mb-5">{trimmed.replace(/^#\s/, '')}</h1>;
          }

          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const items = trimmed.split('\n').map((line) => line.replace(/^[-*]\s/, ''));
            return (
              <ul key={index} className="list-disc pl-6 space-y-2 mb-6 text-muted-foreground">
                {items.map((item, itemIndex) => (
                  <li key={itemIndex}>{formatInline(item)}</li>
                ))}
              </ul>
            );
          }

          return (
            <p key={index} className="mb-5 leading-8 text-muted-foreground">
              {formatInline(trimmed)}
            </p>
          );
        })
      )}
    </div>
  );
};

export default SimpleMarkdown;
