import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const getUpdateNotificationStyles = makeStyles((theme: Theme) => ({
  getUpdateNotificationContainer: {
    padding: '64px 0',
    background: 'linear-gradient(45deg, #2E1C89 0%, #492C92 100%), linear-gradient(180deg, #061753 0%, #184FA7 100%);',
    '& h2': {
      marginBottom: 55,
      color: `${theme.palette.bgHighlight.main}`,
      fontFamily: 'MuliBold',
    },
  },
  getUpdateNotificationForm: {
    margin: '40px 0 0',
    justifyContent: 'center',
    '& > div': {
      width: 440,
      marginRight: 8,
      borderRadius: 3,
      '& > div': {
        padding: '0 10px',
        backgroundColor: `${theme.palette.common.white}`,
      },
      '& input': {
        padding: '10.5px 14px',
        fontSize: 14,
        fontFamily: 'MuliRegular',
      },
      '& svg': { marginRight: 16 },
      '@media(max-width: 600px)': { width: '100%' },
      '@media(max-width: 620px)': { marginRight: 0 },
    },
    '& button': {
      height: 'auto',
      textTransform: 'uppercase',
      '@media(max-width: 620px)': { marginTop: 15 },
    },
  },
  alertBoxContainer: {
    marginTop: 25,
    display: 'flex',
    justifyContent: 'center',
    '& > div': {
      width: '600px',
      backgroundColor: `${theme.palette.error.light}`,
      '& svg': { color: `${theme.palette.error.main}` },
      '& .MuiAlertTitle-root': { fontFamily: 'MuliRegular' },
      '& .MuiAlert-message': { marginBottom: 0 },
      '@media(max-width: 600px)': { width: '100%' },
    },
  },
}));

export default getUpdateNotificationStyles;
