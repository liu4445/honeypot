import { vars } from '@/globalTheme.css';
import { createVar, style } from '@vanilla-extract/css';

export const billCardContentsMain = style({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'flex-start',
  columnGap: 4,
  padding: '10px 16px',
});

export const billCardContentsProblem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  rowGap: 24,
  padding: '20px 32px',
  //   border: '1px solid red',
});

export const billCardContentsProblemText = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  rowGap: 10,
});

export const fontTitle = style({
  //   height: 58,
  fontSize: 17,
  fontWeight: 700,
});

export const fontContent = style({
  //   height: 58,
  width: '100%',
  whiteSpace: 'pre-wrap',
  fontSize: 14,
  fontWeight: 500,
  wordWrap: 'break-word',
});
