import { PaletteMode } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

interface ToggleThemeProps extends IconButtonProps {
  currentTheme: PaletteMode;
  toggleColorMode: () => void;
}

export const ToggleTheme = ({
  currentTheme,
  toggleColorMode,
  ...props
}: ToggleThemeProps) => {
  return (
    <IconButton
      onClick={toggleColorMode}
      color="primary"
      size="small"
      aria-label="Theme toggle button"
      {...props}
    >
      {currentTheme === 'dark' ? (
        <WbSunnyRoundedIcon fontSize="small" />
      ) : (
        <ModeNightRoundedIcon fontSize="small" />
      )}
    </IconButton>
  );
};
