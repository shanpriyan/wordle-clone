import { IconGithub, IconHelp } from '@icons';
import { ExternalLink, ThemeButton } from '@components';
import { useModal } from '@hooks';
import { MODAL_TYPE } from '@constants';

export function Header() {
  const { dispatchModal } = useModal();
  return (
    <header className="flex h-header w-full items-center justify-center border-b border-gray-30 px-3 text-4xl dark:border-black-10">
      <ExternalLink href="https://github.com/shanpriyan/wordle-clone">
        <IconGithub className="h-7 w-7 opacity-100 hover:opacity-60" />
      </ExternalLink>
      <IconHelp
        className="ml-2 h-7 w-7 cursor-pointer  opacity-100 hover:opacity-80"
        onClick={() => dispatchModal({ type: MODAL_TYPE.HELP })}
      />
      <div className="flex-1 text-center text-xl font-bold xsm:text-4xl">
        Wordle
      </div>
      <ThemeButton className="ml-9" />
    </header>
  );
}
