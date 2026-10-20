import Link from 'next/link';
import clsx from './clsx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'soft';
type Size = 'sm' | 'md' | 'lg';

const ALLOWED = [
  '免费诊断',
  '预约演示',
  '联系销售',
  '查看定价',
  '申请案例报告',
  '开始免费试用',
  '阅读文档',
  '查看产品',
  '下载白皮书',
  '立即开始',
  '订阅',
];

type CTAPropsBase = {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

type CTAPropsLink = CTAPropsBase & {
  href: string;
  onClick?: never;
  type?: never;
  external?: boolean;
};

type CTAPropsButton = CTAPropsBase & {
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit';
  external?: never;
};

export type CTAButtonProps = CTAPropsLink | CTAPropsButton;

function validate(label: React.ReactNode) {
  if (typeof label !== 'string') return;
  const ok = ALLOWED.some((w) => label.includes(w));
  if (!ok && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      `[CTAButton] 文案 "${label}" 未命中白名单。推荐词：${ALLOWED.join(' / ')}`,
    );
  }
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-400 shadow-sm',
  secondary:
    'bg-gray-900 text-white hover:bg-black focus-visible:ring-gray-400',
  ghost:
    'bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-300',
  /** 浅灰底 + 轻微 hover 加深，用于同一组按钮里需要弱化的次级选项 */
  soft: 'bg-gray-300 text-gray-900 hover:bg-gray-400 focus-visible:ring-gray-400',
};

const sizes: Record<Size, string> = {
  sm: 'h-11 px-4 text-sm rounded-lg',
  md: 'h-12 px-5 text-sm font-semibold rounded-xl',
  lg: 'h-14 px-7 text-base font-semibold rounded-2xl',
};

export function CTAButton(props: CTAButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    ariaLabel,
    children,
  } = props;
  validate(children);
  const base = clsx(
    'touch-target inline-flex items-center justify-center whitespace-nowrap transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  );

  if ('href' in props && props.href) {
    if (props.external || props.href.startsWith('http')) {
      return (
        <a
          href={props.href}
          target={props.external === false ? undefined : '_blank'}
          rel="noopener noreferrer"
          className={base}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={base} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={(props as CTAPropsButton).type ?? 'button'}
      onClick={(props as CTAPropsButton).onClick}
      className={base}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default CTAButton;
