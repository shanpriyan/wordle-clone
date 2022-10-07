import cx from 'clsx';
import {IconLight, IconDark} from '@icons';

export function ThemeButton({className}) {
  const buttonStyle =
    'w-8 h-8 rounded-lg items-center justify-center hover:ring-2 hover:ring-[#666666] transition-all';
  const iconClass = 'h-5 w-5';
  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => window.__setPreferredTheme('dark')}
        className={cx('flex bg-gray-20 dark:hidden', buttonStyle)}
      >
        <IconDark className={iconClass} />
      </button>
      <button
        type="button"
        onClick={() => window.__setPreferredTheme('light')}
        className={cx('hidden bg-black-40 dark:flex', buttonStyle)}
      >
        <IconLight className={iconClass} />
      </button>
    </div>
  );
}
