import stylex from '@stylexjs/stylex';

const sm: SmMaxMediaQuery = '@media (max-width: 640px)';

const styles = stylex.create({
  logo: {
    width: {
      default: null,
      [sm]: '8rem',
    },
  },
});

// MODIFIED Logo Component
const Logo = () => (
  <svg
    {...stylex.props(styles.logo)}
    width="280"
    height="60"
    viewBox="0 0 280 60"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>UA Writers Space Logo</title>
    <defs>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .shield-blue { fill: #005BBB; } /* Ukrainian Blue */
            .shield-yellow { fill: #FFD700; } /* Ukrainian Yellow */
            .text-light { fill: #FFFFFF; }
            .text-dark { fill: #2c3e50; } /* Dark grey for professionalism */
            .main-text { font-family: 'Arial', 'Helvetica', sans-serif; font-weight: bold; }
            .sub-text { font-family: 'Arial', 'Helvetica', sans-serif; }
          `,
        }}
      />
    </defs>

    {/* Shield Element */}
    <g transform="translate(5,5)">
      <path d="M0 0 H40 V20 L20 30 L0 20 Z" className="shield-blue" />
      <path d="M0 20 H40 V30 L20 40 L0 30 Z" className="shield-yellow" />
      <text x="20" y="26" className="text-light main-text" fontSize="18" textAnchor="middle">UA</text>
    </g>

    {/* Text: Writers Space */}
    <text x="65" y="28" className="text-dark main-text" fontSize="20">Writers</text>
    <text x="65" y="48" className="text-dark sub-text" fontSize="18">Space</text>
  </svg>
);

export default Logo;
