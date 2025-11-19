import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#166CB8',
      dark: '#005AE6',
      light: '#4180CB',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#263238',
      secondary: '#546E7A',
      disabled: 'rgba(38, 50, 56, 0.38)',
    },
    action: {
      active: 'rgba(38, 50, 56, 0.56)',
      hover: 'rgba(22, 108, 184, 0.04)',
      selected: 'rgba(22, 108, 184, 0.08)',
      focus: 'rgba(22, 108, 184, 0.12)',
      disabled: 'rgba(38, 50, 56, 0.38)',
      disabledBackground: 'rgba(38, 50, 56, 0.12)',
    },
    success: {
      main: '#4CAF50',
      600: '#43A047',
      700: '#388E3C',
    },
    error: {
      main: '#F44336',
      600: '#E53935',
      700: '#D32F2F',
    },
    warning: {
      main: '#FF9800',
      600: '#FB8C00',
      700: '#F57C00',
    },
    background: {
      default: '#F9F9F9',
      paper: '#FFFFFF',
    },
    divider: 'rgba(176, 190, 197, 0.6)',
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: 96, fontWeight: 300 },
    h2: { fontSize: 60, fontWeight: 300 },
    h3: { fontSize: 48, fontWeight: 400 },
    h4: { fontSize: 34, fontWeight: 600 },
    h5: { fontSize: 24, fontWeight: 400 },
    h6: { fontSize: 20, fontWeight: 500 },
    body1: { fontSize: 15, fontWeight: 400 },
    body2: { fontSize: 14, fontWeight: 400 },
    subtitle1: { fontSize: 16, fontWeight: 400 },
    subtitle2: { fontSize: 14, fontWeight: 500 },
    caption: { fontSize: 12, fontWeight: 400 },
    overline: { fontSize: 12, fontWeight: 400 },
    button: {
      fontSize: 14,
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeMedium: {
          height: 40,
          fontSize: 14,
          fontWeight: 500,
          padding: '0 16px',
        },
        sizeSmall: {
          height: 40,
          fontSize: 13,
          fontWeight: 500,
          padding: '0 16px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#B0BEC5',
            },
            '&:hover fieldset': {
              borderColor: '#90A4AE',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#166CB8',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: 14,
            fontWeight: 500,
          },
          '& .MuiInputBase-input': {
            fontSize: 16,
            fontWeight: 400,
            padding: '12px 16px',
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        outlined: {
          border: '1px solid #B0BEC5',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '1px solid #B0BEC5',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
