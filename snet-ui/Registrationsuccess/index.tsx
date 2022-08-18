import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import GradientBox from '../../snet-ui/GradientBox';
import { Box } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import { Container, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { AIRDROP_TOKEN_DIVISOR, SUCCESSFUL_REGISTRATION_STRING } from 'utils/airdropWindows';
import colors from '../Theme/colors';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAppSelector } from 'utils/store/hooks';
import LoadingButton from '../../snet-ui/LoadingButton';

type StakeInfo = {
  claimableTokensToWallet: string;
  isStakable: boolean;
  tokenName: string;
  stakableTokens: string;
  isLoading: boolean;
};

type RegistrationSuccessProps = {
  onViewSchedule: () => void;
  onViewRules: () => void;
  onViewNotification: () => void;
  windowId: number;
  totalWindows: number;
  claimStartDate: string;
  registrationValue: string;
  airdropWindowrewards: number;
  stakeInfo: StakeInfo;
  onClaim: () => void;
};

export default function Success({
  onViewSchedule,
  onViewRules,
  onViewNotification,
  windowId,
  totalWindows,
  claimStartDate,
  registrationValue,
  airdropWindowrewards,
  stakeInfo,
  onClaim,
}: RegistrationSuccessProps) {
  const [copied, setCopied] = useState(false);
  const [claimLoader, setClaimLoader] = useState(false);
  const { airdropStatusMessage } = useAppSelector((state) => state.airdropStatus);
  const [showCopiedText, setShowCopiedText] = useState(false);

  const copyIdToCipboard = () => {
    setShowCopiedText(true);
    setTimeout(() => {
      setShowCopiedText(false);
    }, 1000);
    if (window && window.navigator) {
      window.navigator.clipboard.writeText(registrationValue);
      setCopied(true);
    }
  };

  const handleClaimClick = async () => {
    try {
      setClaimLoader(true);
      await onClaim();
    } finally {
      setClaimLoader(false);
    }
  };

  return (
    <Box>
      <GradientBox $background="bgGradientHighlight" sx={{ py: '40px', pb: '40px', borderRadius: '8px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/images/Congratulations.png" alt="SingularityNET" height="160px" width="170px" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3, pb: 3 }}>
          <Box>
            <Typography align="center" variant="h3" pb={1.5} sx={{ color: `${colors.WHITE}` }}>
              Congratulations
            </Typography>
            <Box>
              <Typography align="center" fontWeight="bold" variant="h5" color="text.secondary" pb={1.5}>
                {SUCCESSFUL_REGISTRATION_STRING}
              </Typography>
            </Box>
            <Box onClick={copyIdToCipboard}>
              <Typography
                align="center"
                variant="body2"
                color="textAdvanced.secondary"
                fontWeight="500"
                textTransform="initial"
              >
                Registration ID:
                <span style={{ color: `${colors.DARK_TEAL}` }}>
                  <br />
                  {registrationValue}
                </span>
                <ContentCopyIcon sx={{ ml: 1, color: `${colors.DARK_TEAL}` }} />
                {showCopiedText ? (
                  <Typography
                    component="span"
                    borderRadius="5px"
                    position="absolute"
                    top="-30px"
                    right="-15px"
                    color="common.white"
                    backgroundColor="common.grey"
                    fontSize="11px"
                    textTransform="capitalized"
                  >
                    Copied!
                  </Typography>
                ) : null}
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" align="center" component="p" color="text.secondary">
                Tokens available to claim
              </Typography>
              <Typography variant="h2" color="textAdvanced.secondary" align="center">
                {airdropWindowrewards / AIRDROP_TOKEN_DIVISOR} {stakeInfo.token_name}
              </Typography>
            </Box>
            <Container
              maxWidth="md"
              sx={{
                my: 3,
                display: 'flex',
                border: 0.3,
                bgcolor: 'note.main',
                borderRadius: 1,
                borderColor: 'note.main',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  my: 1,
                  py: 1,
                  m: 1,
                }}
              >
                <InfoIcon color="primary" />
                <Typography variant="body2" color="textAdvanced.primary" sx={{ mx: 1, fontSize: 16 }}>
                  You can start claiming your tokens now. It is possible to claim all tokens in the last window which
                  will save you gas fees.
                </Typography>
              </Box>
            </Container>
            <Box display="flex" justifyContent="center" sx={{ mb: 5 }}>
              <LoadingButton
                variant="contained"
                sx={{
                  width: 350,
                  textTransform: 'capitalize',
                  fontWeight: 600,
                }}
                onClick={handleClaimClick}
                loading={claimLoader}
              >
                ClAIM NOW
              </LoadingButton>
            </Box>
            <Box>
              <Stack spacing={3} direction="row" justifyContent="center">
                <Button
                  variant="outlined"
                  color="bgHighlight"
                  onClick={onViewNotification}
                  sx={{ textTransform: 'capitalize' }}
                >
                  <Typography color="text.secondary" fontSize="14px" fontWeight="600">
                    Get Notifications
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  color="bgHighlight"
                  onClick={onViewSchedule}
                  sx={{ textTransform: 'capitalize' }}
                >
                  <Typography color="text.secondary" fontSize="14px" fontWeight="600">
                    View Schedule
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  color="bgHighlight"
                  onClick={onViewRules}
                  sx={{ textTransform: 'capitalize' }}
                >
                  <Typography color="text.secondary" fontSize="14px" fontWeight="600">
                    View Rules
                  </Typography>
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </GradientBox>
    </Box>
  );
}
