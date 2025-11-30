interface StatusBadgeProps {
  status: 'configured' | 'not-set' | 'active' | 'inactive';
  text?: string;
}

export function StatusBadge({ status, text }: StatusBadgeProps) {
  const variants = {
    configured: 'bg-green-500/20 text-green-400 border-green-500/30',
    'not-set': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    active: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  };
  
  const labels = {
    configured: text || 'Configured',
    'not-set': text || 'Not Set',
    active: text || 'Active',
    inactive: text || 'Inactive'
  };
  
  return (
    <span className={`px-3 py-1 rounded-full border text-xs ${variants[status]}`}>
      {labels[status]}
    </span>
  );
}
