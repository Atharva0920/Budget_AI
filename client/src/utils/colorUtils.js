const colors = [
  'emerald', 'blue', 'purple', 'orange',
  'cyan', 'red', 'yellow', 'indigo'
];

const getColorClasses = (color = 'blue', context = 'primary') => {
  if (!colors.includes(color)) color = 'blue';

  const base = {
    primary: `text-${color}-600`,
    bg: `bg-${color}-50`,
    progress: `bg-${color}-600`,
    border: `border-${color}-200`
  };

  return base[context] || base.primary;
};
export {getColorClasses};