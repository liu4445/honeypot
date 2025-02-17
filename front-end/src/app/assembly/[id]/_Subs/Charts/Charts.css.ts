import { vars } from '@/globalTheme.css';
import { style } from '@vanilla-extract/css';

export const titleText = style({
  display: 'flex',
  justifyContent: 'space-between',
  lineHeight: '18px',
  fontSize: '18px',
  fontWeight: 700,
  padding: '4px 0px',
  borderBottom: `1px solid ${vars.colors.service.STROKE_OR_BLUR}`,
  marginBottom: '12px',
});

export const givenInfomation = style({
  fontSize: '12px',
  color: vars.colors.service.SUB_BLACK,
});

export const givenInfomationLink = style({
  fontSize: '12px',
  color: vars.colors.service.SUB_BLACK,
  textDecoration: 'underline',
});

export const wrapper = style({
  width: '100%',
  height: 'fit-content',
});

export const chartsContainer = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '24px',

  '@media': {
    '(max-width: 974px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
});

export const chartContainer = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  padding: '0px 24px',
  position: 'relative',
});

export const posterWrapper = style({
  width: '47%',
  minWidth: '276px',

  '@media': {
    '(max-width: 974px)': {
      width: '80%',
    },
  },
});

export const infoWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: 0,
  right: 0,
});

export const totalCount = style({
  color: vars.colors.service.SUB_BLACK,
  textAlign: 'right',
  fontSize: '12px',
  height: '20px',
  lineHeight: '20px',
});

export const infomationGivenDate = style({
  height: '20px',
  lineHeight: '20px',
  textAlign: 'center',
  fontSize: '10px',
  color: vars.colors.service.SUB_BLACK,
});

export const toolTipTitle = style({
  fontSize: '12px',
  fontWeight: 600,
  paddingTop: '4px',
});

export const tooltipText = style({
  width: 'fit-content',
  textWrap: 'nowrap',
});

export const boldText = style({
  fontWeight: 600,
});
