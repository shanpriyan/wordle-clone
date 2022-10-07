export function ExternalLink({children, target, ...rest}) {
  return (
    <a {...rest} rel="noopener noreferer" target={target ?? '_blank'}>
      {children}
    </a>
  );
}
