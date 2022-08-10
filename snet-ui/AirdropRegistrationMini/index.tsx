import React, { useMemo } from 'react';
import GradientBox from 'snet-ui/GradientBox';
import Typography from '@mui/material/Typography';
import FlipCountdown from 'snet-ui/FlipClock/Countdown';
import SNETButton from 'snet-ui/SNETButton';
import Box from '@mui/system/Box';
import styles from './styles';
import { makeStyles } from '@mui/styles';
import { getDateInStandardFormat } from 'utils/date';
import { TOTAL_AIRDROPS_STRING, TOTAL_AIRDROP_TOKENS_STRING, numberWithCommas } from 'utils/airdropWindows';
import { setShowConnectionModal } from '../../utils/store/features/walletSlice';
import { useAppDispatch } from '../../utils/store/hooks';

const useStyles = makeStyles(styles);

type AirdropRegistrationMiniProps = {
  windowMessage: string;
  startDate: Moment;
  totalTokens: number;
  tokenName: string;
  totalAirdropWindows: number;
  currentAirdropWindow: number;
  windowAction: string;
  onClickNotification: Function;
};

export default function AirdropRegistrationMini({
  windowMessage,
  startDate,
  totalTokens,
  tokenName,
  totalAirdropWindows,
  currentAirdropWindow,
  windowAction,
}: AirdropRegistrationMiniProps) {
  const dispatch = useAppDispatch();
  const formattedDate = useMemo(() => getDateInStandardFormat(startDate), [startDate]);
  const formattedTotalTokens = useMemo(() => numberWithCommas(totalTokens), [totalTokens]);
  const classes = useStyles();

  return (
    <GradientBox className={classes.registrationBox}>
      <Typography className={classes.registrationInfoMsg}>
        {windowMessage} {currentAirdropWindow}/{totalAirdropWindows} {windowAction} <span>{formattedDate}</span>
      </Typography>
      <FlipCountdown endDate={startDate} />
      <div className={classes.airdropDetails}>
        <div>
          <Typography variant="normal" color="text.secondary">
            {TOTAL_AIRDROPS_STRING}
          </Typography>
          <Typography variant="h3" color="text.secondary">
            {totalAirdropWindows}
          </Typography>
        </div>
        <div>
          <Typography variant="normal" color="text.secondary">
            {TOTAL_AIRDROP_TOKENS_STRING}
          </Typography>
          <Typography variant="h3" color="text.secondary">
            {formattedTotalTokens} {tokenName}
          </Typography>
        </div>
      </div>
      <Box className={classes.connectWalletBtn}>
        <SNETButton name="Connect Wallet" onClick={() => dispatch(setShowConnectionModal(true))} variant="container" />
      </Box>
    </GradientBox>
  );
}
