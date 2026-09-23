import { cn } from '../../lib/cn.js';

/** Page container: max width + responsive gutters. */
export default function Wrap({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('w-full max-w-wrap mx-auto px-gutter', className)} {...rest}>
      {children}
    </Tag>
  );
}
