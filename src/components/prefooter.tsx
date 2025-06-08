import stylex from '@stylexjs/stylex';
import { colors } from '../styles/theme.stylex';
import { Row, Col } from './grid';
import Heading from './heading';
import Stack from './stack';
import Button from './button';
import Paragaph from './paragraph'; // Still using "Paragaph" as per your original file. Change to "Paragraph" if that's the correct component name.
import Section from './section';

import CtaWritersIllustration from '../assets/cta-writers.png';

// Assuming MdMaxMediaQuery type is defined elsewhere or can be omitted.
// const md: MdMaxMediaQuery = '@media (max-width: 768px)';
const md = '@media (max-width: 768px)';


const styles = stylex.create({
  prefooter: {
    position: 'relative',
    backgroundColor: colors.ash300,
    borderRadius: '0.833rem',
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem',
    paddingLeft: {
      default: '2.5rem',
      [md]: '1.5rem',
    },
    paddingRight: {
      default: '2.5rem',
      [md]: '1.5rem',
    },
    overflow: 'hidden',
  },
  textCol: {
    // No specific styles needed for now, can be used for overrides
  },
  illustrationCol: {
    display: {
        default: 'flex',
        [md]: 'none',
    },
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    maxWidth: '100%',
    maxHeight: '250px',
    height: 'auto',
    display: 'block',
  }
});

const Prefooter = () => (
  <Section> {/* This outer Section adds semantic structure and potential default spacing */}
    <div {...stylex.props(styles.prefooter)}>
      <Row alignItems="center" gap="xl"> {/* Assuming Row supports 'gap' or handles spacing internally */}
        <Col span={7} break="md" {...stylex.props(styles.textCol)}>
          <Stack gap="md">
            <Stack gap="sm">
              <Heading level="h2" size={40}>Ready to share your voice?</Heading>
              <Paragaph fontSize={22}>
                Join our community of Ukrainian writers. Contribute your articles, share insights,
                and let your expertise shine!
              </Paragaph>
            </Stack>
            <Row>
                <Col layout="fit">
                    <Button href="/contribute/" fontSize={20}>Become a contributor</Button>
                </Col>
            </Row>
          </Stack>
        </Col>
        <Col span={5} break="md" {...stylex.props(styles.illustrationCol)}>
          <img
            src={CtaWritersIllustration.src}
            loading="lazy"
            alt="Illustration encouraging writers to contribute to Ukrainian Writers' Space"
            {...stylex.props(styles.illustration)}
          />
        </Col>
      </Row>
    </div>
  </Section>
);

export default Prefooter;