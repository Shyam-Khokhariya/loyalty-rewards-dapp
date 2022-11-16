import React, { useMemo } from 'react';
import NavBar from './NavBar';
import headerStyles from './styles';
import { navData, userActions } from '../../snet-ui/constants/Header';
import { Button as MuiButton, useMediaQuery } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import AccountModal from '../Blockchain/AccountModal';
import { AppBar, Toolbar, useTheme } from '@material-ui/core';
import DrawerComponent from './DrawerComponent';
import SNETButton from '../SNETButton';
import { useAppSelector } from 'utils/store/hooks';
import { useWeb3React } from '@web3-react/core';
import { SUPPORTED_WALLETS } from '../Blockchain/Wallet';

type HeaderProps = {
  account?: string;
  onConnectWallet: () => void;
  onDisconnect: () => void;
};

const Button = styled(MuiButton)`
  text-transform: capitalize;
`;

const Header = ({ onConnectWallet, onDisconnect, account }: HeaderProps) => {
  const { cardanoWalletAddress } = useAppSelector((state) => state.wallet);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [ethWalletName, setEthWalletName] = React.useState('');
  const classes = headerStyles();
  const { connector } = useWeb3React();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        setEthWalletName(SUPPORTED_WALLETS[key].name);
      }
    });
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const truncatedAddress = useMemo(() => {
    if (!account) return '';
    return account.slice(0, 4) + '...' + account.slice(-4);
  }, [account]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1023));
  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar>
        <div className={classes.logo}>
          <a href="/" className={classes.logoAnchor}>
            <img src="/AppLogo.svg" alt="SingularityNET" />
          </a>
          <span>Loyalty Rewards</span>
        </div>
        {isMobile ? (
          <DrawerComponent
            onConnectWallet={onConnectWallet}
            navigationData={navData}
            userActions={userActions}
            account={account}
            cardanoWalletAddress={cardanoWalletAddress}
          />
        ) : (
          <div className={classes.navlinks}>
            <div className={classes.navigationSection}>
              <NavBar navigationData={navData} onConnectWallet={onConnectWallet} />
              {account ? (
                <div className={classes.rightButton}>
                  <Button aria-expanded={open ? 'true' : undefined} onClick={handleOpenUserMenu}>
                    <AccountBalanceWalletIcon />
                    <div>
                      <span>Wallet Account</span>
                      <p>
                        {account && cardanoWalletAddress ? '2/2' : '1/2'}
                        <span>connected</span>
                      </p>
                    </div>
                  </Button>
                  <AccountModal open={open} onClose={handleUserMenuClose} ethWalletName={ethWalletName} />
                </div>
              ) : (
                <div className={classes.rightButton}>
                  <SNETButton variant="contained" name="connect wallet" onClick={onConnectWallet} />
                </div>
              )}
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
