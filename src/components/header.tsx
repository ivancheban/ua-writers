import stylex from '@stylexjs/stylex';
import { useState } from 'react';
import Logo from './logo'; // Assuming logo.tsx (or .svg as component) is in the same directory
import { fontSizes, fontWeights, colors } from '../styles/theme.stylex'; // Adjust path if theme is elsewhere
import Button from './button'; // Assuming button.tsx is in the same directory

// Define Media Query types or use strings directly if types are not globally available
// Example: type XlMaxMediaQuery = string;
// For simplicity here, I'll assume these constants are understood by StyleX as strings
const xl: string = '@media (max-width: 1280px)';
const sm: string = '@media (max-width: 640px)';

// Prop types
interface HeaderProps {
  currentPath: string;
}

interface GenericChildrenProps {
  children: React.ReactNode;
}

interface HeaderNavDrawerProps {
  children: React.ReactNode;
  isOpen?: boolean;
}

interface HeaderNavLinkProps {
  children: React.ReactNode;
  href: string;
  currentPath: string;
}

const Header = (props: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header {...stylex.props(styles.header)}>
      <a href="/" aria-label="UA Writers' Space Home"> {/* Updated aria-label */}
        <Logo />
      </a>
      <HeaderNav>
        <HeaderNavDrawer isOpen={isOpen}>
          <button
            type="button"
            aria-label="close menu"
            onClick={() => setIsOpen(false)}
            {...stylex.props(styles.close)}
          >
            <svg width="1.5rem" height="1.5rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
          </button>
          <HeaderNavLink href="/" currentPath={props.currentPath}>Overview</HeaderNavLink>
          <HeaderNavLink href="/blog/" currentPath={props.currentPath}>Blog</HeaderNavLink>
          <HeaderNavLink href="/about/" currentPath={props.currentPath}>About us</HeaderNavLink>
          
          {/* Updated Sign In link */}
          <HeaderNavLink href="/admin/" currentPath={props.currentPath}>Sign In</HeaderNavLink>
          
          {/* Updated Sign Up button to Contribute */}
          <Button size="sm" fontSize={20} href="/contribute/">Contribute</Button>
        </HeaderNavDrawer>
        <button
          type="button"
          aria-label="open menu"
          onClick={() => setIsOpen(true)}
          {...stylex.props(styles.hamburger)}
        >
          <svg width="1.5rem" height="1.5rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor" d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
          </svg>
        </button>
      </HeaderNav>
    </header>
  );
};

const HeaderNav = (props: GenericChildrenProps) => (
  <nav {...stylex.props(styles.nav)} aria-label="main navigation">
    {props.children}
  </nav>
);

const HeaderNavDrawer = (props: HeaderNavDrawerProps) => (
  <div {...stylex.props(styles.drawer, props.isOpen && styles.drawerOpen)}>
    {props.children}
  </div>
);

const HeaderNavLink = (props: HeaderNavLinkProps) => (
  <a 
    href={props.href} 
    {...stylex.props(
        styles.link, 
        // Ensure currentPath ends with a slash if href does for accurate comparison, or normalize both
        (props.currentPath === props.href || `${props.currentPath}/` === props.href || props.currentPath === `${props.href}/`) && styles.linkActive
    )} 
    data-astro-prefetch // Astro's prefetch attribute
  >
    {props.children}
  </a>
);

const styles = stylex.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: { // Using individual padding properties for clarity
        default: '1.666rem',
        [sm]: '0.833rem',
    },
    paddingBottom: {
        default: '1.666rem',
        [sm]: '0.833rem',
    },
    // Assuming horizontal padding is handled by a parent Container component
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem', // Gap between nav items on desktop
  },
  link: {
    width: {
      default: 'fit-content',
      [xl]: '100%', // Links take full width in mobile drawer
    },
    height: 'min-content', // Or fit-content
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    fontSize: fontSizes['20'],
    fontWeight: fontWeights.semibold,
    lineHeight: 1,
    textDecoration: 'none',
    color: colors.black, // Assuming colors.black is defined in your theme
    borderBottomWidth: {
        default: '2px',
        [xl]: '0px' // No border in mobile drawer
    },
    borderBottomStyle: {
        default: 'solid',
        [xl]: 'none'
    },
    borderBottomColor: {
      default: 'transparent',
      ':hover': colors.ash600, // Assuming colors.ash600 is defined
      ':focus': colors.ash600,
    },
    outline: 'none',
  },
  linkActive: {
    borderBottomColor: colors.ash600, // Active link border color on desktop
    // For mobile drawer, active state might need different styling (e.g., background or font color)
    // Example for mobile drawer active state (adjust as needed):
    // [xl]: {
    //   color: colors.primary, // Or your theme's primary color
    //   fontWeight: fontWeights.bold,
    // }
  },
  hamburger: {
    display: {
      default: 'none',
      [xl]: 'flex', // Changed to flex to help center SVG if needed
    },
    alignItems: 'center', // Added
    justifyContent: 'center', // Added
    padding: '0.5rem', // Added some padding to make it easier to tap
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: colors.black, // Ensure icon color is set
  },
  drawer: {
    display: 'flex',
    minWidth: '280px', // Or a suitable width for your content
    zIndex: 1000, // Ensure it's above other content
    transform: {
      default: 'none', // No transform on desktop
      [xl]: 'translateX(100%)', // Off-screen to the right on mobile
    },
    opacity: {
      default: 1,
      [xl]: 0, // Hidden on mobile by default
    },
    visibility: { // Added for better accessibility and to prevent interaction when hidden
        default: 'visible',
        [xl]: 'hidden',
    },
    alignItems: {
      default: 'center', // Align items horizontally on desktop
      [xl]: 'flex-start', // Align items to the start in mobile drawer
    },
    gap: {
      default: '2rem', // Gap between nav items on desktop
      [xl]: '0rem', // Remove gap, links will stack and manage their own padding/margin
    },
    position: {
      default: 'static',
      [xl]: 'fixed', // Fixed position for mobile overlay
    },
    flexDirection: {
      default: 'row',
      [xl]: 'column', // Stack items vertically in mobile drawer
    },
    top: 0,
    right: 0,
    bottom: 0,
    paddingTop: { default: 0, [xl]: '2rem'},
    paddingBottom: { default: 0, [xl]: '2rem'},
    paddingLeft: { default: 0, [xl]: '1.5rem'}, // Adjusted from 1.3rem
    paddingRight: { default: 0, [xl]: '1.5rem'},// Adjusted from 1.3rem
    backgroundColor: {
      default: 'transparent',
      [xl]: colors.ash100, // Background for mobile drawer (light gray)
    },
    boxShadow: {
      default: 'none',
      [xl]: '-0.5rem 0 2rem rgba(0, 0, 0, 0.1)', // Shadow for mobile drawer
    },
    transitionProperty: 'transform, opacity, visibility', // Added visibility
    transitionDuration: '.25s',
    // transitionTimingFunction: 'ease-in-out', // Optional: for smoother animation
  },
  drawerOpen: {
    opacity: { // Ensure opacity is set for open state
        default: 1, // Keep this for potential desktop use if drawerOpen was ever true
        [xl]: 1,
    },
    transform: { // Ensure transform is set for open state
        default: 'none',
        [xl]: 'translateX(0)',
    },
    visibility: { // Ensure visibility is set for open state
        default: 'visible',
        [xl]: 'visible',
    }
  },
  close: {
    background: 'none', // Explicitly none
    border: 'none',
    cursor: 'pointer',
    marginLeft: 'auto', // Push to the right
    marginBottom: '1rem', // Space below close button
    padding: '0.5rem', // Make it easier to tap
    display: {
      default: 'none', // Hidden on desktop
      [xl]: 'flex',   // Changed to flex
    },
    alignItems: 'center', // Added
    justifyContent: 'center', // Added
    color: colors.black, // Ensure icon color
  },
  // navCta style was defined but not used, can be removed if Button handles its own full-width on mobile
  // navCta: {
  //   width: {
  //     default: 'auto', // Changed from 'none' to 'auto' for default button width
  //     [xl]: '100%',
  //   }
  // }
});

export default Header;